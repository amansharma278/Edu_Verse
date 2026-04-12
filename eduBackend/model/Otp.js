const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    }
    ,
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    },

})

// send email

async function sendVerificationEmail(email, otp){
    try{

        const mailResposne = await mailSender(email, "Verification Email from eduVerse",otp)
        console.log("Email send successfully", mailResposne);

    }catch(error){
        console.log("Error while sending mail", error.message)
        throw error
    }
}

otpSchema.pre('save',async function(next){
   await sendVerificationEmail(this.email, this.otp)
    next()
})

module.exports = mongoose.model("OTP", otpSchema);