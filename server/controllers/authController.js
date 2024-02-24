import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import errorHandler from "../utils/errorHandler.js";
import jwtToken from "jsonwebtoken";



export const signUp=async(req,res,next)=>{
    const {username,email,password,image}=req.body;
    if(!username||!email||!password||username===""||email===""||password===""){
        return next(errorHandler(401,"All fields are required!!"))
    };
    try {
        const hashPassword= bcrypt.hashSync(password,10);
        const newUser=await User({username,email,password:hashPassword,image})
        await newUser.save();
        res.status(201).json({
            message:"Successfuly created!"
        });
        
    } catch (error) {
           next(error)
    }
}

export const signIn=async(req,res,next)=>{
    const{email,password}=req.body;
    if(!email||!password||email===""||password===""){
        return next(errorHandler(401,"All fields are required!!"))
    }
    try {
        const user=await User.findOne({email});
        console.log(user);
         if(!user){
            return next(errorHandler(401,"User not exist!"))
         }
         const matchPassword=await bcrypt.compare(password,user.password);
         if(!matchPassword){
            return next(errorHandler(401,"Password not correct!"))
         }else{

            const token=jwtToken.sign({id:user._id},process.env.JWT_SECRET);
            const{password:pass,...rest}=user._doc;
            res.cookie("access_token",token,{httpOnly:true});
            res.status(200).json(rest);
    
         }

    } catch (error) {
        next(error);
    }
};