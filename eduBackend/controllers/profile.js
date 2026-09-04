const User = require("../model/User");
const Profile = require("../model/Profile");

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("additionDetails").select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, email, phone_no, about, headline, image } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email, _id: { $ne: user._id } });
            if (emailExists) {
                return res.status(409).json({ success: false, message: "Email is already in use" });
            }
        }

        user.firstName = firstName?.trim() || user.firstName;
        user.lastName = lastName?.trim() || user.lastName;
        user.email = email?.trim() || user.email;
        user.phone_no = phone_no?.trim() || user.phone_no;
        user.image = image?.trim() || user.image;
        await user.save();

        if (user.additionDetails) {
            await Profile.findByIdAndUpdate(user.additionDetails, { about, headline });
        }

        const updatedUser = await User.findById(user._id).populate("additionDetails").select("-password");
        return res.status(200).json({ success: true, user: updatedUser, message: "Profile updated successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};