import express from 'express';
import {sendEmail} from "../emailService";


const friendshipRouter = express.Router();

friendshipRouter.post('/request', async (req, res) => {
    const {userEmail, friend} = req.body;
    sendEmail('Friendship request', `User ${friend} wants to be friends with you`, userEmail).then(() => {
        res.json({message: 'Friendship request sent'});

    }).catch((e) => {
        console.error(e);
        res.status(500).json({message: 'An error occurred while sending the email'});
    });

});

friendshipRouter.post('/accept', async (req, res) => {
    const {userEmail, friend} = req.body;
    sendEmail('Friendship accepted', `User ${friend} has accepted your friend request`, userEmail).then(() => {
        res.json({message: 'Friendship accepted'});

    }).catch((e) => {
        console.error(e);
        res.status(500).json({message: 'An error occurred while sending the email'});
    });
});

friendshipRouter.post('/reject', async (req, res) => {
    const {userEmail, friend} = req.body;
    sendEmail('Friendship rejected', `User ${friend} has rejected your friend request`, userEmail).then(() => {
        res.json({message: 'Friendship rejected'});

    }).catch((e) => {
        console.error(e);
        res.status(500).json({message: 'An error occurred while sending the email'});
    });
});

export default friendshipRouter;