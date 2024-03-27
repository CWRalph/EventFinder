import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const nodemailer = require("nodemailer");
const cors = require("cors");

dotenv.config();

const app: Express = express();
app.use(cors());

const port = process.env.PORT || 4000;

app.get("/", (req: Request, res: Response) => {
  res.send("Default setup for internal service");
});

// Create a transporter object with SMTP configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // SMTP server hostname
    port: 587, // Port for secure SMTP (TLS)
    secure: false, // Use TLS (true for 465, false for other ports)
    auth: {
        user: 'your_email@example.com', // Your email address
        pass: 'your_email_password' // Your email password or app-specific password
    }
});

// Function to send an email
async function sendEmail(email:string, subject:string, text:string) {
    try {
        // Send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'your_email@example.com', // Sender email address
            to: email, // Recipient email address
            subject: subject, // Email subject
            text: text // Plain text body
        });
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Example usage of sendEmail function
// sendEmail('recipient@example.com', 'Test Email', 'This is a test email from Node.js');


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
