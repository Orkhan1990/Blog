import { Button, Textarea } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

const CommentSection = ({postId}) => {
    const{currentUser}=useSelector(state=>state.auth);
    const[comment,setComment]=useState("");
    const[error,setError]=useState(null);
    const userId=currentUser._id
    console.log(postId,error,userId);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(comment.length>200){
            return;
        }
        try {
            const res = await fetch(
                "http://localhost:3001/api/v1/comment/create",
                {
                  method: "POST",
                  credentials: "include", // added this part
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body:JSON.stringify({comment,postId,userId})
                }
              );
              const data = await res.json();
              if(!res.ok||data.success===false){
                return setError(data.message)
              }
               if(res.ok){
                 setComment("");
               }

        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div>
         {
            currentUser?(<div className="flex gap-1 items-center">
            <span className="text-sm text-slate-500">Signed in as:</span>
            <img src={currentUser.image} alt={currentUser.username}  className="w-5 h-5 rounded-full"/>
            <Link to="/dashboard?tab=profile" className="text-xs text-cyan-600 hover:underline ">@{currentUser.username}</Link>
          </div>):
          (<div className="text-sm text-teal-500 my-5 flex gap-1">You must be signed in to comment.
            <Link className="text-blue-500 hover:underline" to="/sign-in">Sign In</Link>
          </div>)
         }
         {
            currentUser&&(
                <form onSubmit={handleSubmit} className="mt-2 border-2 border-cyan-500 rounded-lg p-4">
                   <Textarea className="outline-none p-2 text-md text-slate-500" placeholder="Add a comment..." rows={"3"} maxLength={"200"} value={comment} onChange={(e)=>setComment(e.target.value)}/>
                   <div className="flex justify-between mt-2">
                    <span className="text-sm text-slate-500">{200-comment.length} characters remaining</span>
                   <Button type="submit" gradientDuoTone={"purpleToBlue"} outline>Submit</Button>
                   </div>
                </form>
            )
         }
           
    </div>
  )
}

export default CommentSection