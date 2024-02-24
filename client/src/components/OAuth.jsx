import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";

const OAuth = () => {
  return (
    <Button
      className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg disabled:bg-slate-400"
      outline
    >
      {<AiFillGoogleCircle className="text-xl mr-1" />}
      Continue with Google
    </Button>
  );
};

export default OAuth;
