import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate,useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdatePost = () => {
  const [formData, setFormData] = useState({});
  const[post,setPost]=useState(null)
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploadImageError, setUploadImageError] = useState(null);
  const [imageProgress, setImageProgress] = useState(false);
  const [downloadImageFromFirebase, setDownloadImageFromFirebase] =
    useState(null);
  const [result, setResult] = useState(null);
  const {currentUser}=useSelector(state=>state.auth);
  const {id}=useParams();

  const navigate = useNavigate();

  console.log(formData, error,id,post);


  //RETRIVE DATA FROM DATABASE

  useEffect(()=>{
   const getPostData=async()=>{
      try {
        const res = await fetch(`http://localhost:3001/api/v1/post/getPost/${id}/${currentUser._id}`, {
            method: "GET",
            credentials: "include", // added this part
            headers: {
              "Content-Type": "application/json",
            },
          });
         const data=await res.json();
         if(data.success===false){
           return setError(data.message);
         }
         if(res.ok){
           setPost(data);
         }
      } catch (error) {
          setError(error.message)
      }
   }
   getPostData();
  },[id])

  //CREATE POST

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/v1/post/create", {
        method: "POST",
        credentials: "include", // added this part
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data.message);
        navigate(`/post/${data.slug}`);
      }
      if(data.success===false){
         setError(data.message)
      }
    } catch (error) {
      setError(error.message);
    }
  };

  //FILLED DATA FROM INPUT

  const handleImageUpload = () => {
    if (!file) {
      return setUploadImageError("Please select image!");
    }
    try {
      setUploadImageError(null);
      setImageProgress(false);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageProgress(progress.toFixed(0));
        },
        (error) => {
          setUploadImageError(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setDownloadImageFromFirebase(downloadURL);
            setFormData({ ...formData, image: downloadURL });
            console.log("File available at", downloadURL);
            setImageProgress(false);
          });
        }
      );
    } catch (error) {
      setError(error.message);
      setImageProgress(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto min-h-screen">
      <h2 className="text-3xl font-semibold text-center mt-20 mb-10">
        Update a post
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-2">
          <TextInput
            type="text"
            placeholder="Title"
            id="title"
            defaultValue={post.title}
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            defaultValue={"uncategorized"}
            className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="uncategorized" selected disabled>
              Select a category
            </option>
            <option value="javascript">Javascript</option>
            <option value="react">React</option>
            <option value="nodejs">Node.js</option>
            <option value="nextjs">Next.js</option>
          </select>
        </div>
        <div className="flex gap-2 h-full p-4 border-4 border-blue-300 border-dashed">
          <input
            type="file"
            id="image"
            className="flex-1 border rounded-lg p-1 bg-gray-50  border-gray-300"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone={"purpleToBlue"}
            outline
            onClick={handleImageUpload}
            disabled={imageProgress}
          >
            {imageProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={"Uploading"}
                  text={`${imageProgress}%` || 0}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {downloadImageFromFirebase && (
          <img
            src={downloadImageFromFirebase}
            alt="post image"
            className="w-full h-30"
          />
        )}
        {uploadImageError && (
          <Alert color={"failure"}>{uploadImageError}</Alert>
        )}
        <ReactQuill
          onChange={(value) => setFormData({ ...formData, content: value })}
          id="content"
          theme="snow"
          placeholder="Write something"
          className="h-72 mb-12"
          required
        />
        {result && <Alert color={"info"}>{result}</Alert>}
        <Button
          type="submit"
          gradientDuoTone={"purpleToPink"}
          className="mb-10"
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdatePost;
