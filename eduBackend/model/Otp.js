const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60,
    },
});

async function sendVerificationEmail(email, otp) {
    const mailResponse = await mailSender(
        email,
        "Your EduVerse verification code",
        {
            text: `Your EduVerse verification code is ${otp}. This code expires in 5 minutes. If you did not request this code, you can ignore this email.`,
            html: `
                <div style="margin:0;background:#f4f7fb;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#172033;">
                    <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e3e8f0;border-radius:12px;overflow:hidden;">
                        <div style="background:#4f46e5;padding:24px 32px;color:#ffffff;">
                            <div style="font-size:24px;font-weight:700;letter-spacing:0;">EduVerse</div>
                            <div style="margin-top:6px;font-size:14px;color:#e0e7ff;">Learn. Build. Grow.</div>
                        </div>
                        <div style="padding:32px;">
                            <h1 style="margin:0 0 12px;font-size:24px;line-height:1.3;color:#172033;">Verify your email address</h1>
                            <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#526078;">Use the verification code below to continue creating your EduVerse account.</p>
                            <div style="margin:0 0 24px;padding:20px;text-align:center;background:#eef2ff;border:1px solid #c7d2fe;border-radius:8px;">
                                <div style="font-size:12px;font-weight:700;letter-spacing:1.5px;color:#4f46e5;text-transform:uppercase;">Verification code</div>
                                <div style="margin-top:10px;font-size:32px;font-weight:700;letter-spacing:8px;color:#172033;">${otp}</div>
                            </div>
                            <p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#526078;">This code expires in <strong style="color:#172033;">5 minutes</strong>.</p>
                            <p style="margin:0;font-size:13px;line-height:1.6;color:#7a879b;">If you did not request this code, you can safely ignore this email. Never share your verification code with anyone.</p>
                        </div>
                        <div style="padding:20px 32px;background:#f8fafc;border-top:1px solid #e3e8f0;font-size:12px;line-height:1.5;color:#7a879b;">This is an automated message from EduVerse. Please do not reply to this email.</div>
                    </div>
                </div>
            `,
        }
    );
    console.log("Email send successfully", mailResponse);
}

otpSchema.pre("save", async function () {
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
});

module.exports = mongoose.model("OTP", otpSchema);
