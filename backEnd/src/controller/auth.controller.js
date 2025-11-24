const User = require('../models/user.model');
const handleError=require('../helper/handleError');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');


const Register=async(req,res,next)=>{
    try{
        const {name,email,password}=req.body;
        const checkuser=await User.findOne({email})
        if(checkuser){
            //user already regsitered
            next(handleError(409,"User already registered"))
        }
        //register
        const hashedPassword=bcryptjs.hashSync(password,10);
        const user=new User({
            name,
            email,
            password:hashedPassword,
        })
        await user.save();
        res.status(201).json({
            success:true,
            message:"User registered successfully",
        })
    }catch(err){
        next(handleError(500,err.message))
    }
}
const Login=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email})
        if(!user){
            //user not found
           return next(handleError(404,"Invalid credentials"))
        }
        const hashedPassword=user.password;
        const comparedPassword=bcryptjs.compareSync(password,hashedPassword);
        if(!comparedPassword){
           return next(handleError(404,"Invalid credentials"))
        }
        const token=jwt.sign({
            _id:user._id,
            name:user.name,
            email:user.email,
            avatar:user.avatar,
        },process.env.JWT_SECRET)
        res.cookie('access_token',token,{
            httOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':'strict',
            path:'/',
        })
        const newUser=user.toObject({getters:true});
        delete newUser.password;
        res.status(200).json({
            success:true,
            message:"User logged in successfully",
            user:newUser
        })
    }catch(err){
        next(handleError(500,err.message))
    }
}
const GoogleLogin=async(req,res,next)=>{
    try{
        const {name, email,avatar}=req.body;
        let user 
        user=await User.findOne({email})
        if(!user){
            const password=Math.random().toString();
            const hashedPassword=bcryptjs.hashSync(password,10);
            const newUser=new User({
                name,
                email,
                avatar,
                password:hashedPassword,
            })
           //register the user 
           user=await newUser.save();
        }
        const token=jwt.sign({
            _id:user._id,
            name:user.name,
            email:user.email,
            avatar:user.avatar,
        },process.env.JWT_SECRET)
        res.cookie('access_token',token,{
            httOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':'strict',
            path:'/',
        })
        const newUser=user.toObject({getters:true});
        delete newUser.password;
        res.status(200).json({
            success:true,
            message:"User logged in successfully",
            user:newUser
        })
    }catch(err){
        next(handleError(500,err.message))
    }
}
const Logout=async(req,res,next)=>{
    try{
        
        res.clearCookie('access_token',{
            httOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':'strict',
            path:'/',
        })
        res.status(200).json({
            success:true,
            message:"User logged out successfully",
        })
    }catch(err){
        next(handleError(500,err.message))
    }
}

module.exports = { Register, Login ,GoogleLogin,Logout};