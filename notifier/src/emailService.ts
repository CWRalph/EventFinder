import nodemailer from "nodemailer";
export async function sendEmail(subject: string, userName: string, content: string, recipient: string) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        }
    });


    let htmlContent = `
    <html lang="en">
        <body>
            <div style="background-color: #333; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0">
                <h1>Evenfinder</h1>
            </div>
            <div style="padding: 20px; background-color: #333; color: white; align-content: center; text-align: center">
                <p>Hi ${userName},</p>
                <p>${content}</p>
                <a href="http://localhost:4200/"
                   style="background-color: #008CBA;border-radius: 5px ;color: white; padding: 15px 25px; text-align: center; text-decoration: none; display: inline-block;">View in Website</a>
            </div>
            <footer style="background-color: #333; color: white; padding: 10px; text-align: center; border-radius: 0 0 5px 5px">
                <p>Thank you for using Evenfinder!</p>
            </footer>
        </body>
    </html>
    `;

    const info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: recipient,
        subject: subject,
        html: htmlContent,
    });

    console.log("Message sent: %s", info.messageId);
}