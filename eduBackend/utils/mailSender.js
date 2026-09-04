const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
        console.log(`[mailSender skipped] to=${email} | ${title} | ${body}`);
        return { skipped: true };
    }

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT) || 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    const info = await transporter.sendMail({
        from: process.env.MAIL_FROM || process.env.MAIL_USER,
        to: email,
        subject: title,
        html: typeof body === "string" && body.trim().startsWith("<")
            ? body
            : `<p>${body}</p>`,
    });

    return info;
};

module.exports = mailSender;
