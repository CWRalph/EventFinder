import express from 'express';
import {Group, Membership} from '../database/schema';
import {catchError, notFound} from "../error";
const verifyToken = require('./verifyToken');

const groupRouter = express.Router();

groupRouter.get('/', async (req, res) => {
    try {
        const groups = await Group.find();
        res.json(groups);
    } catch (e) {
        catchError(e, res);
    }
});

// New route to get groups for a specific user by user ID
groupRouter.get('/user/:userId/groups', async (req, res) => {
    const { userId } = req.params;

    try {
        // Find all memberships for the given user ID
        const memberships = await Membership.find({ user: userId, role: { $ne: 'owner' } }).populate('group');

        if (!memberships || memberships.length === 0) {
            return res.json([]); // Return an empty array
        }

        // Extract group IDs from memberships
        const groupIds = memberships.map(membership => membership.group);

        // Query the Group collection to get the corresponding group objects
        const groups = await Group.find({ _id: { $in: groupIds } });

        res.json(groups);
    } catch (e) {
        catchError(e, res);
    }
});

// New route to get groups for a specific user by user ID
groupRouter.get('/user/:userId/group-owner', async (req, res) => {
    const { userId } = req.params;

    try {
        // Find all memberships for the given user ID
        const memberships = await Membership.find({ user: userId, role: { $ne: 'member' } }).populate('group');

        if (!memberships || memberships.length === 0) {
            return res.json([]); // Return an empty array if user has no owned groups
        }

        // Extract group IDs from memberships
        const groupIds = memberships.map(membership => membership.group);

        // Query the Group collection to get the corresponding group objects
        const groups = await Group.find({ _id: { $in: groupIds } });

        res.json(groups);
    } catch (e) {
        catchError(e, res);
    }
});


// Groups that the user is NOT a part of
groupRouter.get('/user/:userId/nonmember', async (req, res) => {
    const { userId } = req.params;

    try {
        // Find all memberships for the given user ID
        const memberships = await Membership.find({ user: userId }).populate('group');
        if (!memberships || memberships.length === 0) {
            // If user has no memberships, return all groups
            const allGroups = await Group.find();
            return res.json(allGroups);
        }

        // Extract group IDs from memberships
        const groupIds = memberships.map(membership => membership.group);

        // Query the Group collection to get the groups where the user is neither a member nor an owner
        const groups = await Group.find({ _id: { $nin: groupIds } });

        res.json(groups);
    } catch (e) {
        catchError(e, res);
    }
    // try {
    //   // Find all memberships for the given user ID
    //   const memberships = await Membership.find({ user: userId });
    //   // Extract group IDs from memberships
    //   const memberGroupIds = memberships.map(membership => membership.group);
    //   // Query the Group collection to get the groups that the user is not a part of
    //   const nonMemberGroups = await Group.find({ _id: { $nin: memberGroupIds } });
    //   res.json(nonMemberGroups);
    // } catch (e) {
    //   catchError(e, res);
    // }
});


// groupRouter.post('/', async (req, res) => {
//     const {groupName, description, visibility} = req.body;
//     const newGroup = new Group({groupName, description, visibility});

//     try {
//         const savedGroup = await newGroup.save();
//         res.status(201).json(savedGroup);
//     } catch (e) {
//         catchError(e, res);
//     }
// });

groupRouter.post('/', async (req, res) => {
    const { groupName, description, visibility, userID, colour } = req.body;

    try {
        const newGroup = new Group({ groupName, description, visibility, colour });
        const savedGroup = await newGroup.save();

        // Create a new membership entry with the current user as the owner
        const newMembership = new Membership({ group: savedGroup._id, user: userID, role: 'owner' });
        await newMembership.save();

        res.status(201).json(savedGroup);
    } catch (e) {
        catchError(e, res);
    }
});

groupRouter.get('/search', async (req, res) => {
    const { query } = req.query as any;

    const pipeline = [
        {
            $search:{
                index: 'GroupAutocompleteIndex',
                compound: {
                    should: [
                        {
                            autocomplete: {
                                query: query,
                                path: "groupName"
                            }
                        },
                        {
                            autocomplete: {
                                query: query,
                                path: "description"
                            }
                        }
                    ],
                }
            }
        }
        
    ]

    //Sort descending order
    const result = await Group.aggregate(pipeline).sort({score:-1});
    // console.log("Search results: ", result);
    res.status(200).json(result);
});


groupRouter.put('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const updatedGroup = await Group.findByIdAndUpdate(id, req.body, {new: true});
        if (!updatedGroup) {
            return notFound(res, 'Group');
        }
        res.json(updatedGroup);
    } catch (e) {
        catchError(e, res);
    }
});

groupRouter.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const deletedGroup = await Group.findByIdAndDelete(id);
        if (!deletedGroup) {
            return notFound(res, 'Group');
        }

        // Delete group memberships associated with the deleted group
        await Membership.deleteMany({ group: id });

        res.json({message: 'Group deleted'});
    } catch (e) {
        catchError(e, res);
    }
});

// This stupid one needs to be under the rest cause it's a catch all! SEARCH WON'T WORK!!!
groupRouter.get('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const group = await Group.findById(id);
        if (!group) {
            return notFound(res, 'Group')
        }
        res.json(group);
    } catch (e) {
        catchError(e, res);
    }
});

export default groupRouter;

