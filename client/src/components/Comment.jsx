import { useEffect, useState } from "react";

const Comment = ({comment}) => {

    const[error,setError]=useState(null);
    const[user,setUser]=useState({});
    console.log(comment,error,user)
    useEffect(()=>{
       const getUser=async()=>{
        try {
            const res = await fetch(
                `http://localhost:3001/api/v1/user/getUser/${comment.userId}`,
                {
                  method: "GET",
                  credentials: "include", // added this part
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              const data = await res.json();
              if(!res.ok||data.success===false){
                setError(data.message);
                return;
              }
              setUser(data)
        } catch (error) {
            setError(error.message)
        }
       }
       getUser()
    },[comment])
  return (
    <div className="flex">
        <div>
            <img src={user.image} alt={user.username} />
        </div>
        <div>
            
        </div>
    </div>
  )
}

export default Comment