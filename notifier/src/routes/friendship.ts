import express from 'express';
import {sendEmail} from "../emailService";


const friendshipRouter = express.Router();

friendshipRouter.post('/', async (req, res) => {
    const {userEmail, friend} = req.body;
    sendEmail('Friendship request', `User ${friend} wants to be friends with you`, userEmail).then(() => {
        res.json({message: 'Friendship request sent'});

    }).catch((e) => {
        console.error(e);
        res.status(500).json({message: 'An error occurred while sending the email'});
    });

});
export default friendshipRouter;
