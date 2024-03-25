import Comment from "../models/comment.model.js";
import errorHandler from "../utils/errorHandler.js";

export const createComment = async (req, res, next) => {
  const { comment, userId, postId } = req.body;
  try {
    if (userId !== req.user.id) {
      return next(
        errorHandler(401, "You are not allowed to create this comment")
      );
    }

    const newComment = await Comment({
      comment,
      userId,
      postId,
    });

    const savedComment = await newComment.save();
    res.status(200).json(savedComment)
  } catch (error) {
    next(error);
  }
};

export const getPostComment=async(req,res,next)=>{
  const{postId}=req.params;
  try {
    const comments=await Comment.find({
      postId
    }).sort({createdAt:-1});
    if(!comments){
      return next(errorHandler(401,"Comments not exist!"))
    }
    res.status(200).json(comments)
    
  } catch (error) {
    next(error)
  }
}
