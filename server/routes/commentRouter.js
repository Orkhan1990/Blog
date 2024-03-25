import express from "express";
import { createComment, getPostComment } from "../controllers/commentController.js";
import { verifyToken } from "../utils/verifyToken.js";



const router=express.Router();

router.post("/create",verifyToken,createComment);
router.get("/getPostComment/:postId",getPostComment)


export default router;