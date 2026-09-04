const User = require("../model/User");
const Profile = require("../model/Profile");
const Otp = require("../model/Otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

function generateNumericOtp() {
    return otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });
}

function normalizeAccountType(value) {
    const key = String(value || "").trim().toLowerCase();
    const map = {
        student: "Student",
        instructor: "Instructor",
        admin: "Admin",
    };
    return map[key] || null;
}

exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const isExist = await User.findOne({ email });

        if (isExist) {
            return res.status(401).json({
                success: false,
                message: "This user already exists",
            });
        }

        let otp = generateNumericOtp();
        let existingOtp = await Otp.findOne({ otp });

        while (existingOtp) {
            otp = generateNumericOtp();
            existingOtp = await Otp.findOne({ otp });
        }

        await Otp.deleteMany({ email });
        const otpBody = await Otp.create({ email, otp });
        console.log("OTP created:", otpBody.email);

        const response = {
            success: true,
            message: "Successfully sent OTP",
        };

        if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
            response.otp = otp;
        }

        return res.status(200).json(response);
    } catch (error) {
        console.log("Error while sending OTP");
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.signup = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            contact_no,
            account_type,
            password,
            conformPassword,
            confirmPassword,
            otp,
        } = req.body;

        const passwordConfirm = conformPassword || confirmPassword;
        const accountType = normalizeAccountType(account_type);

        if (!firstName || !lastName || !email || !contact_no || !password || !passwordConfirm || !otp) {
            return res.status(403).json({
                success: false,
                message: "Fill all input fields carefully",
            });
        }

        if (!accountType) {
            return res.status(400).json({
                success: false,
                message: "Please choose a valid account type",
            });
        }

        if (password !== passwordConfirm) {
            return res.status(401).json({
                success: false,
                message: "Password not matched",
            });
        }

        const exist = await User.findOne({ email });

        if (exist) {
            return res.status(401).json({
                success: false,
                message: "User already exists",
            });
        }

        const recentOtp = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);

        if (!recentOtp || recentOtp.length === 0) {
            return res.status(400).json({
                success: false,
                message: "OTP not found or expired",
            });
        }

        if (String(recentOtp[0].otp) !== String(otp)) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        let hashpassword;

        try {
            hashpassword = await bcrypt.hash(password, 10);
        } catch (error) {
            console.log("error while hashing the password");
            return res.status(402).json({
                success: false,
                message: "Error while hashing the password",
                error: error.message,
            });
        }

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contact: contact_no,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            phone_no: contact_no,
            accountType,
            additionDetails: profileDetails._id,
            password: hashpassword,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        await Otp.deleteMany({ email });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone_no: user.phone_no,
                accountType: user.accountType,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while signup",
            error: error.message,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "Please fill the input field",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "This user is not registered",
            });
        }

        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                id: user._id,
                email: user.email,
                accountType: user.accountType,
            };
            const token = await jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            const userObj = user.toObject();
            userObj.token = token;
            userObj.password = undefined;
            res.cookie("token", token, {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }).status(200).json({
                success: true,
                token,
                user: userObj,
                message: "Logged in successfully",
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Password not matched",
            });
        }
    } catch (error) {
        console.log("error while login", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while login",
        });
    }
};
