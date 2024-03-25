import mongoose from "mongoose";


const commentShema=new mongoose.Schema({

    comment:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    likes:{
        type:Array,
        default:[]
    },
    numberOfLikes:{
        type:Number,
        default:0
    }
},{timestamps:true})


const Comment=mongoose.model('comment',commentShema);

export default Comment;