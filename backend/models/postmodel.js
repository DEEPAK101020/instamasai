const mongoose=require("mongoose");

const express=require("express");

const postschema=mongoose.Schema({
    title: String,
    body: String,
    device: String,
    no_of_comments: Number,
    userID:String,
    name:String
},
{
    versionKey:false
})



const PostModel=mongoose.model("post",postschema);
module.exports={
    PostModel
}