import { Button, Spinner } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch, useSelector } from "react-redux";
import {
  getSuccess,
  getLoading,
  getFailure,
} from "../redux/features/authSlice.js";
import {useNavigate} from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const navigate=useNavigate();

  const auth = getAuth(app);
  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({prompt:"select_account"})
    dispatch(getLoading);
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultFromGoogle.user.photoURL);
      const res = await fetch("http://localhost:3001/api/v1/auth/google", {
        method: "POST",
        credentials: "include", // added this part
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          image: resultFromGoogle.user.photoURL,
        }),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(getFailure(data.message));
      }
      console.log(data);
      if (res.ok) {
        dispatch(getSuccess(data));
        navigate("/")
      }
    } catch (error) {
      dispatch(getFailure(error.message));
    }
  };
  return (
    <Button
      className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg disabled:bg-slate-400"
      outline
      onClick={handleGoogle}
      type="button"
      disabled={loading}
    >
      {loading ? (
        <div>
          <Spinner size={"sm"} />
          <span className="pl-3">Loading....</span>
        </div>
      ) : (
        <>
          {<AiFillGoogleCircle className="text-xl mr-1" />}
          Continue with Google
        </>
      )}
    </Button>
  );
};

export default OAuth;
