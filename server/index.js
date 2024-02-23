import express from 'express';
import mongoose from "mongoose";
import denv from "dotenv";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
denv.config();



const port=process.env.PORT||9000

const app=express();
app.use(express.json());
app.use(express.urlencoded());


app.use("/api/v1/auth/",authRouter);
app.use("/api/v1/user/",userRouter);
app.get('/',(req,res)=>{
    res.status(200).json({
        message:"Hello World"
    })
})

mongoose.connect(process.env.MONGODB).then(()=>console.log("Db connected successfuly!!")).catch((error)=>{
    console.log(error.message);
})


app.listen(port,()=>{
    console.log(`Server is runing on port ${port} `);
})