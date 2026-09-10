const User = require("../model/User");

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("firstName lastName email accountType courses isActive createdAt")
            .sort({ createdAt: -1 });

        return res.status(200).json({ success: true, users });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch users",
            error: error.message,
        });
    }
};

exports.updateUserStatus = async (req, res) => {
    try {
        const { userId } = req.params;
        const { isActive } = req.body;

        if (typeof isActive !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "isActive must be a boolean",
            });
        }

        if (String(userId) === String(req.user.id)) {
            return res.status(400).json({
                success: false,
                message: "You cannot change your own account status",
            });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { isActive },
            { new: true, runValidators: true }
        ).select("firstName lastName email accountType courses isActive createdAt");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            message: `User ${isActive ? "activated" : "suspended"} successfully`,
            user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update user status",
            error: error.message,
        });
    }
};