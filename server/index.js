import express from 'express';
import denv from "dotenv";
denv.config();



const port=process.env.PORT||9000

const app=express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/',(req,res)=>{
    res.status(200).json({
        message:"Hello World"
    })
})




app.listen(port,()=>{
    console.log(`Server is runing on port ${port} `);
})