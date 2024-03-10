import User from "../models/user.model.js";
import errorHandler from "../utils/errorHandler.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Isleyir" });
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You are not allowed update this user!"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be more than 6 characters"));
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, 'Username must be between 7 and 20 characters')
      );
    }
    if (req.body.username.includes(' ')) {
      return next(errorHandler(400, 'Username cannot contain spaces'));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, 'Username must be lowercase'));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, 'Username can only contain letters and numbers')
      );
    }
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username:req.body.username,
          email:req.body.email,
          image:req.body.image,
          password:req.body.password
        },
      },
      { new: true }
    );

    const{password:pass,...rest}=updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser=async(req,res,next)=>{
  if(req.user.id!==req.params.id){
    return next(errorHandler(401,"User can not delete account!"));
  }
  try {
       await User.findByIdAndDelete(req.params.id);
       res.clearCookie("access_token");
       res.status(200).json("User deleted successfully!")   
  } catch (error) {
    next(error);
  }
}
