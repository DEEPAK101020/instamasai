const express=require("express")
const mongoose=require("mongoose");
const {auth}=require("../middleware/auth")
const {PostModel}=require("../models/postmodel")

const postrouter=express.Router();
postrouter.use(auth)

postrouter.post("/add",async(req,res)=>{
    try{const post=new PostModel(req.body)
        await post.save();
        res.status(200).json({msg:"new post added"})
    }catch(err){
        res.status(400).json(err)
    }
})

postrouter.get("/",async(req,res)=>{
    try{
const post=await PostModel.find({userID:req.body.userID})
res.status(200).json({post})
    }catch(err){
        res.status(400).json(err)
    }
})
postrouter.patch("update/:updateid",async(req,res)=>{
    const {id}=req.params;
    const payload=req.body 
    try{
if(payload.userID==req.body.userID){
    await PostModel.findByIdAndUpdate({_id:id},payload)
    res.status(200).json({msg:"notes updated"})
}
    }catch(err){
        res.status(400).json(err)
    }
})

postrouter.delete("update/:delete",async(req,res)=>{
    const {id}=req.params;
    const payload=req.body 
    try{
if(payload.userID==req.body.userID){
    await PostModel.findByIdAndDelete({_id:id},payload)
    res.status(200).json({msg:"notes deleted"})
}
    }catch(err){
        res.status(400).json(err)
    }
})

postrouter.get("/top",async(req,res)=>{
    try{
        const userId=req.user.id;
        const page=req.query.page?parseInt(req.query.page):1
        const limit=3;
        const post=await PostModel.find({user:userID}).sort({no_of_comments:-1}).skip((page-1)*limit)
    }catch(err){
        res.status(400).json(err)
    }
})

module.exports={
    postrouter
}