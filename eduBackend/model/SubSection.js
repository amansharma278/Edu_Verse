const mongoose = require('mongoose');

const subSection = new mongoose.Schema({
    title:{
        type:String,
    },
    timeDurations:{
        type:String,
    },
    descriptions:{
        type:String,
    },
    videoUrl:{
        type:String,
    }
})
module.exports = mongoose.model('SubSection', subSection);