import express from 'express';
import {Group, Membership, User} from "../database/schema";
import {catchError, notFound} from "../error";

const groupMembershipRouter = express.Router();
groupMembershipRouter.get('/', async (req, res) => {
    try {
        const memberships = await Membership.find();
        res.json(memberships);
    } catch (e) {
        catchError(e, res);
    }
});

groupMembershipRouter.post('/', async (req, res) => {
    const {group: groupId, user: userId, role} = req.body;

    try {
        const group = await Group.findById(groupId);
        const user = await User.findById(userId);

        if (!group) {
            return notFound( res, 'Group');
        }
        if (!user) {
            return notFound( res, 'User');
        }

        const newMembership = new Membership({group: groupId, user: userId, role});
        await newMembership.save();

        res.status(201).json(newMembership);
    } catch (e) {
        catchError(e, res);
    }
});

groupMembershipRouter.get('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const membership = await Membership.findById(id);
        if (!membership) {
            return notFound(res, 'Membership');
        }
        res.json(membership);
    } catch (e) {
        catchError(e, res);
    }
});

groupMembershipRouter.put('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const updatedMembership = await Membership.findByIdAndUpdate(id, req.body, {new: true});
        if (!updatedMembership) {
            return notFound(res, 'Membership');
        }
        res.json(updatedMembership);
    } catch (e) {
        catchError(e, res);
    }
});

groupMembershipRouter.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const deletedMembership = await Membership.findByIdAndDelete(id);
        if (!deletedMembership) {
            return notFound(res, 'Membership');
        }
        res.json({message: 'Membership deleted'});
    } catch (e) {
        catchError(e, res);
    }
});

export default groupMembershipRouter;
