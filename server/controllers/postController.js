import errorHandler from "../utils/errorHandler.js";
import Post from "../models/post.model.js";

export const createPost=async(req,res,next)=>{
     console.log(req.user)
    if(!req.user.isAdmin){
        return next(errorHandler(401,"User can not create post!"))
    }

    if(!req.body.title||!req.body.content){
        return next(errorHandler(401,"All fields required!!!"))
    }
    const slug=req.body.title.split("").join("-").toLowerCase().replace(/^[a-zA-Z0-9]+$/," ")
    try {

       const newPost=await Post({
          ...req.body,
          slug,
          userId:req.user.id
       });
         const savedPost=await newPost.save();
         
       res.status(201).json({savedPost,message:"Successfuly created!"});
        
    } catch (error) {
           next(error)
    }
}