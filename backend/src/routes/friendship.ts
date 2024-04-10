import express from 'express';
import {Friendship, User} from "../database/schema";
import {catchError, notFound} from "../error";
const verifyToken = require('./verifyToken');

// This is how you limit access to verified users
// this verify function checks whether a user has a valid token
// Place this anywhere you want to protect routes
const verify = require('./verifyToken');

const friendshipRouter = express.Router();

const hitNotifier = async (user1Id: string, user2Id: string, url: string, res: express.Response, currentUrl: string) => {
    const user1 = await User.findById(user1Id);
    const user2 = await User.findById(user2Id);

    if (!user1 || !user2) {
        return notFound(res, 'One of both users');
    }

    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userEmail: user1.email,
            friend: user2.username,
            username: user1.username,
            currentUrl,
        }),
    });
}

friendshipRouter.get('/', async (req, res) => {
    try {
        const friendships = await Friendship.find().populate('user1 user2', 'username email'); // Optionally populate user details;
        res.json(friendships);
    } catch (e) {
        catchError(e, res);
    }
});

// This will deny access if user isn't verified
// friendshipRouter.post('/', verify , async (req, res) => {
friendshipRouter.post('/', async (req, res) => {
    const {user1: user1Id, user2: user2Id, status, currentUrl} = req.body;

    try {
        const user1 = await User.findById(user1Id);
        const user2 = await User.findById(user2Id);

        if (!user1 || !user2) {
            return notFound(res, 'One of both users');
        }

        const newFriendship = new Friendship({user1: user1Id, user2: user2Id, status});
        await newFriendship.save();

        res.status(201).json(newFriendship);

        // Hit the notifier endpoint to send an email
        /**
         * NOTE: we are assuming that user1 is the one receiving the friend request and user2 is the one sending it
         */
        await hitNotifier(user1Id, user2Id, 'http://localhost:4000/friendship/request', res, currentUrl).then(() => {
            console.log('Email sent');
        }, (e: Error) => {
            catchError(e, res);
        });

    } catch (e) {
        catchError(e, res);
    }
});

// This only fetches the friendship by the friendship table ID, NOT THE USER
friendshipRouter.get('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const friendship = await Friendship.findById(id).populate('user1 user2', 'username email'); // Optionally populate user details;
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
    const {status, currentUrl} = req.body;

    const friendship = await Friendship.findByIdAndUpdate(id, {status}, {new: true});

    if (!friendship) {
        return notFound(res, 'Friendship');
    }

    const user1 = await User.findById(friendship.user1);
    const user2 = await User.findById(friendship.user2);

    if (!user1 || !user2) {
        return notFound(res, 'One of both users');
    }

    try {

        if (status == 'Accepted') {
            if (!friendship) {
                return notFound(res, 'Friendship');
            }

            // update the friendship status
            friendship.status = status;
            await friendship.save().then(() => {
                console.log('Friendship updated');
            });

            res.json(friendship);

            hitNotifier(friendship.user2.toString(), friendship.user1.toString(), 'http://localhost:4000/friendship/accept', res, currentUrl).then(() => {
                console.log('Email sent');
            }, (e: Error) => {
                catchError(e, res);
            });
        } else if (status == 'Rejected') {
            const deletedFriendship = await Friendship.findByIdAndDelete(id);
            if (!deletedFriendship) {
                return notFound(res, 'Friendship');
            }
            res.json({message: 'Friendship deleted'});

            // Hit the notifier endpoint to send an email
            await hitNotifier(user2._id.toString(), user1._id.toString(), 'http://localhost:4000/friendship/reject', res, currentUrl).then(() => {
                console.log('Email sent');
            }, (e: Error) => {
                catchError(e, res);
            });
        }
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
