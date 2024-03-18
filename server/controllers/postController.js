import errorHandler from "../utils/errorHandler.js";
import Post from "../models/post.model.js";

export const createPost = async (req, res, next) => {
  console.log(req.user);
  if (!req.user.isAdmin) {
    return next(errorHandler(401, "User can not create post!"));
  }

  if (!req.body.title || !req.body.content) {
    return next(errorHandler(401, "All fields required!!!"));
  }
  const slug = req.body.title
    .split("")
    .join("-")
    .toLowerCase()
    .replace(/^[a-zA-Z0-9]+$/, " ");
  try {
    const newPost = await Post({
      ...req.body,
      slug,
      userId: req.user.id,
    });
    const savedPost = await newPost.save();

    res.status(201).json({ savedPost, message: "Successfuly created!" });
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, option: "i" } },
          { content: { $regex: req.query.searchTerm, options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPost = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDay()
    );
    const lastMonthPosts = await Post.countDocuments({
      createAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({
      posts,
      totalPost,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  try {
    if (id) {
      await Post.findByIdAndDelete(id);
      return res.status(200).json({message:"Post successfuly deleted!"})
    }else{
        return next(401,"Post can not deleted,not exist!")
    }
  } catch (error) {
    next(error);
  }
};

export const getPost=async(req,res,next)=>{

    if(req.user.id!==req.params.userId||!req.user.isAdmin){
        return next(errorHandler(401,"Can not upadate the post!"))
    }
    try {
         const post=await Post.findById(req.params.id);
         if(!post){
            return next(errorHandler(401,"The post not exist!"))
         }

         res.status(200).json(post);
        
    } catch (error) {
        next(error)
    }
}
