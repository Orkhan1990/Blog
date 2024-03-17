import { Alert, Button, TextInput,Modal} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { app } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {getFailure,getSuccess,getLoading,deleteFailure,deleteSuccess,signOutFromAccount} from "../redux/features/authSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";


const DashProfile = () => {
  const { currentUser,loading,error } = useSelector((state) => state.auth);
  const dispatch=useDispatch();
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [formData, setFormData] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageProgressShow,setImageProgressShow]=useState(false);
  const [openModal, setOpenModal] = useState(false);
  const fileRef = useRef();

  const handleImageChange = (e) => {
    const profileFile = e.target.files[0];
    if (profileFile) {
      setFile(profileFile);
      setFileUrl(URL.createObjectURL(profileFile));
    }
  };

  useEffect(() => {
    if (file) {
      uploadImage(file);
    }
  }, [file]);
  console.log(file);
  const uploadImage = async (file) => {
    setImageUploadError(null);
    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const imageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(imageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError(
            "Could not upload image (File must be less than 2MB)"
          );
          setImageUploadProgress(null);
          setFile(null);
          setFileUrl(null);
          if(imageUploadProgress!==100){
            setImageProgressShow(true)
          }
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFileUrl(downloadURL);
          });
        }
      );
      setFormData({...formData,image:fileUrl});
    } catch (error) {
      console.log(error.message);
    }
  };

   //DATA FILL FROM INPUT
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value});
  };
  console.log(formData);

  //FORM SUBMIT AND SEND BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(Object.keys(formData).length===0){
      return;
    }
    try {
      dispatch(getLoading());
      const res=await fetch(`http://localhost:3001/api/v1/user/updateUser/${currentUser._id}`,{
        method:"PUT",
        credentials: "include", // added this part
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(formData)
      })

      const data=await res.json();
      console.log(data);
      if(data.success===false){
        dispatch(getFailure(data.errorMessage))
      }
      if(res.ok){
        dispatch(getSuccess(data))
      }
    } catch (error) {
      dispatch(getFailure(error.message))
    }
  };

  //DELETE ACCOUNT FUNCTIONALITY

  const deleteAccount= async()=>{
      try {
        const res=await fetch(`http://localhost:3001/api/v1/user/deleteUser/${currentUser._id}`,{
          method:"DELETE",
          credentials: "include", // added this part
          headers: {
            "Content-Type": "application/json",
          },
        });
          const data=await res.json();
          if(data.success===false){
            dispatch(deleteFailure(data.errorMessage))
          }
          if(res.ok){
            console.log(data);
            dispatch(deleteSuccess());
          }
          
        
      } catch (error) {
        dispatch(deleteFailure(error.message))
      }
  }

  //SIGN OUT

const signOut=async()=>{
     
  const res=await fetch("http://localhost:3001/api/v1/auth/signOut",{
    method:"GET",
    credentials: "include", // added this part
    headers: {
      "Content-Type": "application/json",
    },
  })

  const data=await res.json();
  if(res.ok){
    dispatch(signOutFromAccount())
  }
   console.log((data));
}




  return (
    <div className=" max-w-lg mx-auto p-3 ">
      <h1 className="text-center text-4xl font-bold mt-10 mb-5">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageChange}
          ref={fileRef}
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden border-8 border-[lightgray] rounded-full object-cover"
          onClick={() => fileRef.current.click()}
        >
          {imageUploadProgress&&imageProgressShow&& (
            <CircularProgressbar
              value={imageUploadProgress || 0}
              text={`${imageUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199,${imageUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={fileUrl || currentUser.image}
            alt="profile image"
            className={`w-full h-full ${
              imageUploadProgress && imageUploadProgress < 100 && "opacity-60"
            }`}
          />
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        <TextInput
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <Button
          className="w-full uppercase transition duration-700 ease-in-out"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={loading}
          type="submit"
        >
          {loading?"Uploading....":"Upload"}
        </Button>
         {currentUser.isAdmin&&<Link to="/post"><Button type="button" className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg">Create Post</Button></Link>}
      </form>

      <div className="w-full flex justify-between mt-2">
        <span onClick={() => setOpenModal(true)} className="text-red-500 cursor-pointer hover:transition hover:duration-75 hover:text-red-800">
          Delete Account
        </span>
        <span onClick={signOut} className="text-red-500 cursor-pointer hover:text-red-800">
          Sign out
        </span>
      </div>
      {
        error&&!loading&&(<Alert color="failure">{error}</Alert>)
      }

<Modal show={openModal} popup size="md" onClose={() => setOpenModal(false)}>
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
          <HiOutlineExclamationCircle  className="text-gray-400 h-14 w-14 font-bold mx-auto"/>
          <span className="text-xl text-slate-700">Are you sure you want delete your account? </span>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-between">
          <Button color="failure" onClick={()=>deleteAccount()}>{"Yes,I'm sure"}</Button>
          <Button color="blue" onClick={() => setOpenModal(false)}>
            No,cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DashProfile;
