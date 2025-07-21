import Body from './body.jsx'
import{ BrowserRouter, Routes,Route } from 'react-router-dom'
import './App.css'
import Login from './Login.jsx'
import Profile from './Profile.jsx'

function App() {


  return (
    <>
  <BrowserRouter> 
  <Routes>
  <Route path="/" element={<Body/>} >
  <Route path="/login" element={<Login/>} />
  <Route path="/profile" element={<Profile/>} />
  </Route>
  </Routes>
  </BrowserRouter>


  
      
    </>
  )
}

export default App
