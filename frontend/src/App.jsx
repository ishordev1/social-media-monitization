import { useState } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import { Route, Router, Routes } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'
import UserBase from './pages/User/UserBase'
import UserHome from './pages/User/UserHome'
import AdminBase from './pages/Admin/AdminBase'
import AdminHome from './pages/Admin/AdminHome'
import BrandBase from './pages/Brand/BrandBase'
import BrandHome from './pages/Brand/BrandHome'
import UserDashbard from './pages/User/UserDashbard'


function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />


        {/* user route */}
        <Route path='/user' element={<UserBase />}>
          <Route path='home' element={<UserHome />}>
            {/* here dashboard */}
            <Route path="dashboard" element={<UserDashbard/>}/>
          </Route>
        </Route>
        {/* user route end */}

        {/* admin route start */}
        <Route path='/admin' element={<AdminBase />}>
          <Route path='home' element={<AdminHome />} >
            {/* here dashboard */}

          </Route>
        </Route>

        {/* admin route end */}

        {/* brand route start */}
        <Route path='/brand' element={<BrandBase/>}>
        <Route path='home' element={<BrandHome/>}/>
        </Route>
        {/* brand route end */}

      </Routes>
      <Footer />
    </>
  )
}

export default App
