const mongoose = require('mongoose');

require('dotenv').config();

exports.dbConnect=async( req, res)=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Successfully connected to the database")
    })
    .catch((error)=>{
        console.log(error)
        console.error(error)
        console.log("Error connecting to the database")
        process.exit(1);
    })
}