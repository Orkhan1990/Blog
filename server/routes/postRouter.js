import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { createPost, deletePost, getPosts,getPost } from "../controllers/postController.js";


const router=express.Router();

router.post("/create",verifyToken,createPost);
router.get("/getPosts",getPosts);
router.delete("/deletePost/:id",deletePost);
router.get("/getPost/:id/:userId",verifyToken,getPost)



export default router;