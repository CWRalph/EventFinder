require('dotenv').config()

import express, {Express} from "express";
import cors from "cors";
import nodemailer from "nodemailer";


const app: Express = express();
app.use(cors());

const port = process.env.PORT || 4000;

const htmlEmail = `testing the mailer`;


async function sendEmail() {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        }
    });
    const info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: 'ahmadipoursepehr@gmail.com',
        subject: 'Test Email',
        text: htmlEmail,
    });

    console.log("Message sent: %s", info.messageId);
}


sendEmail().catch(e => console.log(e));

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
