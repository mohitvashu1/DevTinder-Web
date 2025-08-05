import React from 'react'
import NavBar from '../Components/NavBar.jsx'
import { Outlet } from 'react-router-dom'
import Footer from './Footer.jsx'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {addUser} from '../utils/userSlice.js'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

const body = () => {
 const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser= async () => {
    if (userData) return;
    try{
      const res = await  axios.get("/api/profile/view",{
        withCredentials: true
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };
  
  useEffect(() => {
    fetchUser();
  }, []);

  return (
      <>
      <NavBar/>
      <Outlet/>
      <Footer/>
      </>
  )
}

export default body