const crypto = require("crypto")
const bcrypt = require("bcrypt")
const User = require("../model/User")
const mailSender = require("../utils/mailSender")

const restPassword = async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Please provide an email address",
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        const token = crypto.randomUUID()
        user.token = token
        user.restPasswordExpires = new Date(Date.now() + 5 * 60 * 1000)
        await user.save()

        const url = `${process.env.FRONTEND_URL || "http://localhost:3000"}/update-password/${token}`
        const emailBody = `
            <p>We received a request to reset your password.</p>
            <p>Click the link below to set a new password. This link expires in 5 minutes.</p>
            <p><a href="${url}">${url}</a></p>
        `

        await mailSender(email, "eduVerse Password Reset", emailBody)

        return res.status(200).json({
            success: true,
            message: "Password reset link sent to email",
        })
    } catch (error) {
        console.error("Error in restPassword:", error)
        return res.status(500).json({
            success: false,
            message: "Unable to process password reset request",
            error: error.message,
        })
    }
}

const updatePassword = async (req, res) => {
    try {
        const { token } = req.params
        const { password, confirmPassword } = req.body

        if (!token || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Token and password fields are required",
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            })
        }

        const user = await User.findOne({
            token,
            restPasswordExpires: { $gt: new Date() },
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired password reset token",
            })
        }

        user.password = await bcrypt.hash(password, 10)
        user.token = null
        user.restPasswordExpires = null
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        })
    } catch (error) {
        console.error("Error in updatePassword:", error)
        return res.status(500).json({
            success: false,
            message: "Unable to update password",
            error: error.message,
        })
    }
}

module.exports = { restPassword, updatePassword }
