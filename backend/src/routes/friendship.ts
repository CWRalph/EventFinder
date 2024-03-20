import express from 'express';
import {Friendship, User} from "../database/schema";
import {catchError, notFound} from "../error";

// This is how you limit access to verified users
// this verify function checks whether a user has a valid token
// Place this anywhere you want to protect routes
const verify = require('./verifyToken');

const friendshipRouter = express.Router();

// This will deny access if user isn't verified
// friendshipRouter.post('/', verify , async (req, res) => {
friendshipRouter.post('/' , async (req, res) => {
    const {user1: user1Id, user2: user2Id, status} = req.body;

    try {
        const user1 = await User.findById(user1Id);
        const user2 = await User.findById(user2Id);

        if (!user1 || !user2) {
            return notFound(res, 'One of both users');
        }

        const newFriendship = new Friendship({user1: user1Id, user2: user2Id, status});
        await newFriendship.save();

        res.status(201).json(newFriendship);
    } catch (e) {
        catchError(e, res);
    }
});

// This only fetches the friendship by the friendship table ID, NOT THE USER
friendshipRouter.get('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const friendship = await Friendship.findById(id);
        if (!friendship) {
            return notFound(res, 'Friendship');
        }
        res.json(friendship);
    } catch (e) {
        catchError(e, res);
    }
});

// Get friendships by user ID <- this one gets them by the user ID
friendshipRouter.get('/user/:userId', async (req, res) => {
    const {userId} = req.params;

    try {
        const friendships = await Friendship.find({
            $or: [{user1: userId}, {user2: userId}],
        }).populate('user1 user2', 'username email'); // Optionally populate user details

        res.json(friendships);
    } catch (e) {
        catchError(e, res);
    }
});

friendshipRouter.put('/:id/update-status', async (req, res) => {
    const {id} = req.params;
    const {status} = req.body;

    try {
        const friendship = await Friendship.findById(id);
        if (!friendship) {
            return notFound(res, 'Friendship');
        }

        friendship.status = status;
        await friendship.save();

        res.json(friendship);
    } catch (e) {
        catchError(e, res);
    }
});

friendshipRouter.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const deletedFriendship = await Friendship.findByIdAndDelete(id);
        if (!deletedFriendship) {
            return notFound(res, 'Friendship');
        }
        res.json({message: 'Friendship deleted'});
    } catch (e) {
        catchError(e, res);
    }
});

export default friendshipRouter;
