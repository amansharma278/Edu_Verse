const jwt = require('jsonwebtoken');
const User = require("../model/User");

require('dotenv').config();

//auth

exports.auth = async (req, res, next) =>{
    try{
        //extract token

        const token = req.header('Authorisation').replace("Bearer","");

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            })
        }
        // Verify

        try{
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decode;
        }catch(error){

            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            })

        }
        next();
    }catch(error){

        return res.status(401).json({
            success:false,
            message:"Something wet wrong while validing the token"
        })

    }
}



//isStudent
exports.isStudent =async(req, res, next)=>{

    try{

        if(req.user.accountType !=="Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Student only"
            })
        }
        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//Is admin

  
exports.isAdmin = async(req, res, next)=>{
    try{

        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"this routes is only for Admin"
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while validing admin"
        })
    }
}

//is Instructor

exports.isInstructor = async (req, res, next )=>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This routes is only for Instructor"
            })
        }
        next()
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"error while validating the instructor routes",
            error:error.message
        })
    }
}