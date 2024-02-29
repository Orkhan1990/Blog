
import { Button, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { getLoading,getSuccess,getFailure } from "../redux/features/authSlice";
import { useDispatch,useSelector} from "react-redux";



const SignIn = () => {
  const[formData,setFormData]=useState({
    email:"",
    password:""
  });


 const navigate=useNavigate();
 const dispatch=useDispatch();
 const{error,loading,currentUser}=useSelector(state=>state.auth);
 console.log(currentUser);


  const handleChange=(e)=>{
  setFormData({...formData,[e.target.id]:e.target.value.trim()})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!formData.username||!formData.email||!formData.password){
      return dispatch(getFailure("All fields required!"))
    }
    dispatch(getLoading());
    try {
      const res=await fetch("http://localhost:3001/api/v1/auth/signIn",{
        method:"POST",
        credentials: "include", // added this part
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(formData)
      })

      const data=await res.json();

      if(data.success===false){
         dispatch(getFailure(data.errorMessage))
        
      }

      if(res.ok){
        navigate("/")
        dispatch(getSuccess(data.rest))
      }
      
      
    } catch (error) {
        dispatch(getFailure(error.message))
    }

  }
  return (
    <div className="max-w-4xl mx-auto min-h-screen mt-20 flex flex-col sm:flex-row">
      <div className="flex-1 py-20">
        <div className="flex items-center font-bold text-3xl mb-2">
          <span className="p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white  ">
            {"Orkhan's"}
          </span>
          Blog
        </div>
        <p className="text-slate-500">
          This is a demo project.You can sign up with your email
          <br />
          and password or with Google.
        </p>
      </div>
      <div className="flex-1">
        <form className="flex flex-col gap-4 mb-4" onSubmit={handleSubmit}>
          <div>
            <label>Your email</label>
            <TextInput type="email" id="email" placeholder="name@company.com" onChange={handleChange} />
          </div>
          <div>
            <label>Your password</label>
            <TextInput type="password" id="password" placeholder="****************" onChange={handleChange} />
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg">
            {
              loading?(
              <div>
                <Spinner size={"sm"}/>
                <span className="pl-3">Loading....</span>
              </div>):"Sign in"
            }
            
            Sign In
          </Button>
        </form>
        <OAuth/>
        <p className="mt-1">
          {"Don't"} have any account?
          <Link to="/sign-up" className="text-blue-700 ml-1">
            Sing up
          </Link>
        </p>
        {error && <p className="text-red-700 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default SignIn;
