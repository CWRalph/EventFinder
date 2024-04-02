import nodemailer from "nodemailer";

export async function sendEmail(subject: string, content: string, recipient: string) {
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
        to: recipient,
        subject: subject,
        text: content,
    });

    console.log("Message sent: %s", info.messageId);
}
