const express=require("express");
const mongoose=require("mongoose")

const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt")
const {UserModel}=require("../models/usermodels")
const {BlacklistModel}=require("../models/blacklist")

const userroute=express.Router();


userroute.post("/register",(req,res)=>{
    const {name,email,gender,password,age,city}=req.body;
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.status(200).json({register:err})
               
            }
            else{
                const user=new UserModel({name, email,gender,password:hash,age,city})
                await user.save();
                res.status(200).json({mesage:"new user registerd"})
            }
        })
    }catch(err){
        res.status(400).json(err)
    }
})

//login
userroute.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(err){
                    res.status(200).json({message:"wrong details"})
                  
                }
                else{
                    const access_token=jwt.sign({UserID:user._id,user:user.name},"masai",{expiresIn:"7d"})
                    const refrsh_token=jwt.sign({UserID:user._id,user:user.name},"masai",{expiresIn:"1d"})
                    res.status(200).json({mesage:"login sucess",user,access_token,refrsh_token})
                }
            })
        }
    }catch(err){
        res.status(400).json(err)
    }
})

userroute.get("logout",async(req,res)=>{
    const access_token=req.headers.authorization?.split(" ")[1];
    const refresh_token=req.headers.authorization?.split(" ")[2]
    try{
const blacklist=new BlacklistModel({access_token,refresh_token})
await blacklist.save();
res.status(200).json({msg:"blacklisted"})
    }catch(err){
        res.status(400).json(err)
    }
})

//export
module.exports={
userroute
}