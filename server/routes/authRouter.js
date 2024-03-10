import express from "express";
import { google, signIn, signOut, signUp } from "../controllers/authController.js";



const router=express.Router();



router.post("/signIn",signIn);
router.post("/signUp",signUp);
router.post("/google",google);
router.get("/signOut",signOut)







export default router;