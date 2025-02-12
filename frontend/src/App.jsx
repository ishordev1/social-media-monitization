import { useState } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import { Route, Router, Routes } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'
import UserHome from './pages/User/Home'
function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/user/home' element={<UserHome/>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
