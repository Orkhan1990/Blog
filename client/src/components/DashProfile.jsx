import { Avatar, Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

const DashProfile = () => {
    const {currentUser}=useSelector(state=>state.auth)

    const handleChange=()=>{

    }
  return (
    <div className="w-full max-w-lg mx-auto">
        <h1 className="text-center text-4xl font-bold mt-10 mb-5">Profile</h1>
        <form className="flex flex-col gap-4">
         <Avatar rounded img={currentUser.image} onChange={handleChange} size="lg"/>
         <TextInput id="username" placeholder="Username" value={currentUser.username} onChange={handleChange}/>
         <TextInput id="email" placeholder="Email" value={currentUser.email} onChange={handleChange}/>
         <TextInput id="password" placeholder="Password" onChange={handleChange}/>
         <Button className="w-full uppercase hover:transition hover:duration-75" gradientDuoTone="purpleToBlue" outline>Update</Button>
        </form>
        <div className="w-full flex justify-between">
            <span className="text-red-500">Delete Account</span>
            <span className="text-red-500">Sign out</span>
        </div>
    </div>
  )
}

export default DashProfile