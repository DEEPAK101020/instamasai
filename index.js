const express=require("express");
const {connection}=require("./db");




const app=express();

app.use(express.json());
const {userroute}=require("./routes/userroutes")

const {postrouter}=require("./routes/postroutes")
app.use("/user",userroute)
app.use("/post",postrouter)



app.listen(8000,async(req,res)=>{
    try{
        await connection
        console.log("connect to DB");
        console.log("port running at 8000")
    }catch(err){
        console.log(err)
    }
})