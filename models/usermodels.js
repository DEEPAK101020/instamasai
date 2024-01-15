const mongoose=require("mongoose");

// const express=require("express");

const userschem=mongoose.Schema({
    name : {type:String},
    email : {type:String,unique:true},
    gender : {type:String},
    password :{type:String},
    age : {type:Number},
    city : {type:String},
},{
    versionKey:false
})
const UserModel=mongoose.model("user",userschem);
module.exports={
    UserModel
}