import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants.js";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1e1f24] px-4 pt-8 pb-4 ">
      <div
        className="
          w-full max-w-sm
          bg-[#1e1f24]
          border border-gray-700
          rounded-2xl
          shadow-xl
          p-6 sm:p-8
          text-gray-200
        "
      >
        <h2
          className="
            text-center
            text-2xl sm:text-3xl
            font-bold
            mb-6
            bg-gradient-to-r from-pink-500 to-orange-400
            bg-clip-text text-transparent
          "
        >
          {isLoginForm ? "Welcome Back" : "Create an Account"}
        </h2>

        {/* ==== Form Fields ==== */}
        <div>
          {!isLoginForm && (
            <>
              <label className="form-control w-full mb-4">
                <span className="label-text text-gray-300 mb-1">First Name</span>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full bg-gray-800 text-gray-200"
                />
              </label>

              <label className="form-control w-full mb-4">
                <span className="label-text text-gray-300 mb-1">Last Name</span>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full bg-gray-800 text-gray-200"
                />
              </label>
            </>
          )}

          <label className="form-control w-full mb-4">
            <span className="label-text text-gray-300 mb-1">Email</span>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="input input-bordered w-full bg-gray-800 text-gray-200"
            />
          </label>

          <label className="form-control w-full mb-4">
            <span className="label-text text-gray-300 mb-1">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full bg-gray-800 text-gray-200"
            />
          </label>
        </div>

        {/* ==== Error Message ==== */}
        {error && (
          <p className="text-red-500 text-center text-sm mb-4">{error}</p>
        )}

       {/* ==== Submit Button ==== */}
<div className="flex justify-center mt-8 mb-4">
  <button
    onClick={isLoginForm ? handleLogin : handleSignUp}
    className="
      px-6 py-2
      rounded-full
      bg-gradient-to-r from-pink-500 to-orange-400
      text-white font-semibold
      hover:from-pink-400 hover:to-orange-300
      transition-all duration-200
      shadow-md
    "
  >
    {isLoginForm ? "Login" : "Sign Up"}
  </button>
</div>


        {/* ==== Toggle Login/Signup ==== */}
        <p
          className="
            text-center
            text-sm
            text-gray-400
            cursor-pointer
            hover:text-pink-400
            transition-colors duration-200
          "
          onClick={() => setIsLoginForm((v) => !v)}
        >
          {isLoginForm
            ? "New user? Sign up here"
            : "Already have an account? Login here"}
        </p>
      </div>
    </div>
  );
};

export default Login;
