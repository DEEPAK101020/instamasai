const jwt=require("jsonwebtoken")
const {BlacklistModel}=require("../models/blacklist");
const auth=async(req,res,next)=>{
    const token1=req.headers.authorization?.split(" ")[1];
    const blacklistoken=await BlacklistModel.findOne({access_token:token1});
    if(token1){
        if(blacklistoken){
            return res.json({message:"you are logged out"});

        }
        try{
    const decoded=jwt.verify(token1,"masai")
    if(decoded){
        req.body.userID=decoded.userID
        req.body.name=decoded.name
        next();
    }
    else{
        res.json({message:"you are not authorized"})
    }
        }catch(err){
res.status(400).json(err)
        }
    }
    else{
        res.status(400).json({msg:"err"})
    }
}
module.exports={
    auth
}