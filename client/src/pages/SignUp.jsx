import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  //FILLED INPUT
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  //SUBMIT FORM

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.username||!formData.email||!formData.password){
      return setError("All fields required!");
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/v1/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.errorMessage);
        setLoading(false);
      }
      if (res.ok) {
        setSuccess("User successfuly created!");
        setError(false);
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-screen flex flex-col md:flex-row mt-20">
      <div className="flex-1 py-20">
        <div className="flex items-center font-bold text-3xl mb-2 ">
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
            <Label value="Your username"/>
            <TextInput
              type="text"
              id="username"
              placeholder="username"
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Your email</label>
            <TextInput
              type="email"
              id="email"
              placeholder="name@company.com"
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label>Your password</label>
            <TextInput
              type="password"
              id="password"
              placeholder="*****************"
              onChange={handleChange}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg disabled:bg-slate-400"
          >
            Sign Up
          </Button>
        </form>
        <OAuth/>
        <p className="mt-1">
          Have an account?{" "}
          <Link to="/sign-in" className="text-blue-700">
            Sing in
          </Link>
        </p>
        {success && <p className="text-green-700 text-sm">{success}</p>}
        {error && <p className="text-red-700 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default SignUp;
