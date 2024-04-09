import express from 'express';
import {sendEmail} from "../emailService";


const friendshipRouter = express.Router();


// export async function sendEmail(subject: string, userName: string, content: string, recipient: string) {


friendshipRouter.post('/request', async (req, res) => {
    const {userEmail, friend, username, currentUrl} = req.body;
    sendEmail('Friendship request', username, `${friend} has sent you a friend request in EventFinder`, userEmail, currentUrl).then(() => {
        res.json({message: 'Friendship request sent'});

    }).catch((e) => {
        console.error(e);
        res.status(500).json({message: 'An error occurred while sending the email'});
    });

});

friendshipRouter.post('/accept', async (req, res) => {
    const {userEmail, friend, username, currentUrl} = req.body;
    sendEmail('Friendship accepted', friend, `${username} has accepted your friend request`, userEmail, currentUrl).then(() => {
        res.json({message: 'Friendship accepted'});

    }).catch((e) => {
        console.error(e);
        res.status(500).json({message: 'An error occurred while sending the email'});
    });
});

friendshipRouter.post('/reject', async (req, res) => {
    const {userEmail, friend, username, currentUrl} = req.body;
    sendEmail('Friendship rejected', friend, `${username} has rejected your friend request`, userEmail, currentUrl).then(() => {
        res.json({message: 'Friendship rejected'});

    }).catch((e) => {
        console.error(e);
        res.status(500).json({message: 'An error occurred while sending the email'});
    });
});

export default friendshipRouter;
