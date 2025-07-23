import React from 'react'
import NavBar from '../Components/NavBar.jsx'
import { Outlet } from 'react-router-dom'
import Footer from './Footer.jsx'

const body = () => {
  return (
      <>
      <NavBar/>
      <Outlet/>
      <Footer/>
      </>
  )
}

export default body