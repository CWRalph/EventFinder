import express from 'express';
import {EventMembership} from "../database/schema";
import {catchError, notFound} from "../error";
const verifyToken = require('./verifyToken');

const eventMembershipRouter = express.Router();

eventMembershipRouter.get('/', async (req, res) => {
    try {
        const memberships = await EventMembership.find();
        res.json(memberships);
    } catch (e) {
        catchError(e, res);
    }
});

eventMembershipRouter.post('/', async (req, res) => {
    const {event: eventId, user: userId, role} = req.body;

    try {
        const newMembership = new EventMembership({event: eventId, user: userId, role: role});
        await newMembership.save();
        res.status(201).json(newMembership);
    } catch (e) {
        catchError(e, res);
    }
});

eventMembershipRouter.delete('/user/:userId/event/:eventId', async (req, res) => {
    const {userId, eventId} = req.params;
    try {
        const deletedMembership = await EventMembership.findOneAndDelete({user: userId, event: eventId})
        if (!deletedMembership) {
            return notFound(res, 'Event Membership');
        }
        res.json(deletedMembership);
    } catch (e) {
        catchError(e, res);
    }
});

eventMembershipRouter.get('/user/:userId', async (req, res) => {
    const {userId} = req.params;
    try {
        const memberships = await EventMembership.find({user: userId});
        res.json(memberships);
    } catch (e) {
        catchError(e, res);
    }
});

eventMembershipRouter.delete('/user/:userId', async (req, res) => {
    const {userId} = req.params;

    try {
        const deletedMembership = await EventMembership.findByIdAndDelete(userId);
        if (!deletedMembership) {
            return notFound(res, 'Event Membership');
        }
        res.json(deletedMembership);
    } catch (e) {
        catchError(e, res);
    }
});

eventMembershipRouter.put('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const updatedMembership = await EventMembership.findByIdAndUpdate(id, req.body, {new: true});
        if (!updatedMembership) {
            return notFound(res, 'EventMembership');
        }
        res.json(updatedMembership);
    } catch (e) {
        catchError(e, res);
    }
});

export default eventMembershipRouter;
