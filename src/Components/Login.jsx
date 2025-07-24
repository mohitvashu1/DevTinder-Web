import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import{ addUser } from '../utils/userSlice.js';
import { useNavigate } from "react-router-dom";







const Login = () => {

const [emailId, setEmailId] = useState('divyatiwari@gmail.com');
const [password, setPassword] = useState('Akshay@12345');
  const [error, setError] = useState("");



const dispatch =useDispatch();
 const navigate = useNavigate();

const handleLogin =async () =>{
  try{
     const res = await axios.post('http://localhost:3001/login' ,{
      emailId,
      password
     },
    { withCredentials: true }
    );
     dispatch(addUser(res.data));
     return navigate("/");
  }catch (err) {
    setError(err?.response?.data || "Something went wrong");

  }
  };



  return (
<div className='flex justify-center my-10'>
  <div className="card bg-base-300 h-[300px] w-96 shadow-sm">
  <div className="card-body ">
    <h2 className="card-title justify-center">Sign-In!</h2>
    <div >
 <div className=' my-7'>
  <label className="floating-label ">
  <span>Email-Id</span>
  <input type="text"
  value={emailId}
  onChange={(e) => setEmailId(e.target.value)}
  placeholder="Email-Id" className="input input-md" />
</label>
 </div>
<div className=''>
  <label className="floating-label">
  <span>Your Password</span>
  <input type="text"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
   placeholder="Password"
    className="input input-md" />
</label>
</div>
    </div>
    <p className="text-red-500 text-xs">{error}</p>

    <div className="card-actions justify-center ">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div> 
</div>
 )
}

export default Login



