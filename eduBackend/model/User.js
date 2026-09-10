const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,

    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone_no: {
        type: String,
    },
    image:{
        type:String
    },
    token:{
        type:String,
    },
restPasswordExpires:{
        type: Date,
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],
    courseProgress: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'courseProgress'
        }

    ],
    accountType: {
        type: String,
        required: true,
        enum: ['Student', 'Instructor', 'Admin']
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    additionDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },

})

//exports
module.exports = mongoose.model('User', UserSchema)