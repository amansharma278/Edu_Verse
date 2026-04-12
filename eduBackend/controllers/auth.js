const User = require('../model/User')
const Profile = require("../model/Profile")
const OTP = require('../model/Otp');
const otpGenrator = require('otp-generator');
const bcrypt = require('bcrypt');
const Otp = require('../model/Otp');
const jwt = require("jsonwebtoken")

require('dotenv').config();


//send otp
exports.sendOTP = async(req , res)=>{

    try{
        const {email} = req.body;

        const isExist = await User.findOne({email});

        if(isExist){
            return res.status(401).json({
                success:false,
                message:"this user is already exist"
            })
        }

        //Genrate otp

        let otp = otpGenrator.generate(6, {
            lowerCaseAlphabets:false,
            upperCaseAlphabets:false,
            specialChars:false,
        })

        console.log(otp);

        const result = await Otp.findOne({otp:otp});

        while(result){
            otp = otpGenrator.generate(6,{
                lowerCaseAlphabets:false,
                upperCaseAlphabets:false,
                specialChars:false,
            })
        }
        result= await Otp.findOne({otp:otp});

        //create Entry in db

        const otpbody = await Otp.create({email, otp});
        console.log(otpbody);
// Send successfull res
        return res.status(200).json({
            success:true,
            message:"Successfully send OTP"
        })

    }catch(error){
        console.log("Error while sending OTP");
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


exports.signup = async (req, res) => {

   try {

     //destructure the data
    const { firstName, lastName, email, contact_no, account_type, password, conformPassword, otp } = req.body;

    if (!firstName || !lastName || !email || !contact_no || !password || !conformPassword || !otp) {
        return res.status(403).json({
            success: false,
            message: "Fill all input fields carefully"
        })
    }

    if (password !== conformPassword) {
        return res.status(401).json({
            success: false,
            message: "Password not matched"
        })
    }

    // check if user already exists
    const exist = await User.findOne({ email })

    if (exist) {
        return res.status(401).json({
            success: false,
            message: "User already exists",
        })
    }

    // find the most recent OTP entry for this email
    const recentOtp = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1)

    if (!recentOtp || recentOtp.length === 0) {
        return res.status(400).json({
            success: false,
            message: "OTP not found or expired"
        })
    }

    if (recentOtp[0].otp !== otp) {
        return res.status(400).json({
            success: false,
            message: "Invalid OTP"
        })
    }

    // remove used OTPs once verified
    await Otp.deleteMany({ email })

    let hashpassword;

    try {
        hashpassword = await bcrypt.hash(password, 10)
    } catch (error) {
        console.log("error while hashing the password")
        return res.status(402).json({
            success: false,
            message: "Error while hashing the password",
            error: error.message
        })
    }

    const profileDetails = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: null,
        contact: null,
    })

    const user = await User.create({
           firstName,
           lastName,
           email,
           phone_no: contact_no,
           accountType: account_type,
           additionDetails: profileDetails._id,
           password: hashpassword,
           image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
    })
    user.password = undefined;

    return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone_no: user.phone_no,
                accountType: user.accountType
            }
        })

   } catch (error) {
    return res.status(500).json({
        success: false,
        message: "Error while signup",
        error: error.message
    })
   }

}

exports.login=async(req, res) =>{
    try{
        //Get the data from req.body

        const {email, password} = req.body;

        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"Please fill the input field"
            })
        }

        //find the email

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                success:false,
                message:"This user is not registered"
            })
        }
      
        if(await bcrypt.compare(password, user.password)){
            let payload={
            id:user._id,
            email:user.email,
            accountType:user.accountType
        }
            const token = await jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn:'2h'
            })

            user = user.toObject();
            user.token = token;
            user.password= undefined;
            res.cookie("token", token, {
                expires: new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in successfully"
            })

        }else{
           return res.status(401).json({
                success:false,
                message:"Password not matched"
            })

        }

    }catch(error){
        console.log("error while login", error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong while login"
        })
    }
}