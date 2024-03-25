import express from "express";
import { deleteUser, getUsers, updateUser,deleteUserFromUserList,getUser } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyToken.js";



const router=express.Router();


router.get('/getUsers',verifyToken,getUsers);
router.put('/updateUser/:id',verifyToken,updateUser);
router.delete('/deleteUser/:id',verifyToken,deleteUser);
router.delete('/delete/:id',verifyToken,deleteUserFromUserList);
router.get('/getUser/:id',getUser)




export default router;