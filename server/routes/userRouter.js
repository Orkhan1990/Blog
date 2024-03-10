import express from "express";
import { deleteUser, getUsers, updateUser } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyToken.js";



const router=express.Router();


router.get('/getUsers',getUsers);
router.put('/updateUser/:id',verifyToken,updateUser);
router.delete('/deleteUser/:id',verifyToken,deleteUser);




export default router;