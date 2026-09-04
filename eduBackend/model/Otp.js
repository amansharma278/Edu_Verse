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
        "Verification Email from eduVerse",
        `<p>Your eduVerse verification code is <strong>${otp}</strong>.</p><p>This code expires in 5 minutes.</p>`
    );
    console.log("Email send successfully", mailResponse);
}

otpSchema.pre("save", async function () {
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
});

module.exports = mongoose.model("OTP", otpSchema);
