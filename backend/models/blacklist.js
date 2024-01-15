const mongoose=require("mongoose");

const blacklistSchema=mongoose.Schema({
    access_token:{type :String},
    refresh_token:{type :String}
},{
    versionKey:false
})
const BlacklistModel=mongoose.model("blalist",blacklistSchema)
module.exports={
    BlacklistModel
}