import express from 'express';
import mongoose from "mongoose";
import denv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import postRouter from "./routes/postRouter.js";
denv.config();



const port=process.env.PORT||9000

const app=express();
app.use(express.json());
app.use(express.urlencoded());
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
app.use(cookieParser());

 

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/post",postRouter);
app.get('/',(req,res)=>{
    res.status(200).json({
        message:"Hello World"
    })
})

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const errorMessage=err.message||"Internal server error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        errorMessage
    })
})

mongoose.connect(process.env.MONGODB).then(()=>console.log("MongoDb is connected!")).catch((error)=>{
    console.log(error.message);
})


app.listen(port,()=>{
    console.log(`Server is runing on port ${port} `);
})