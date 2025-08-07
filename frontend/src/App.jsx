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
import { ToastContainer } from 'react-toastify'
import UserDashboard from './pages/User/UserDashbard'

import Campaign from './pages/User/Campaign'
import Cashback from './pages/User/cashback/Cashback'
import BrandDashboard from './pages/Brand/dashboard/BrandDashboard'
import LoadMoney from './pages/Brand/loadMoney/LoadMoney'
import BrandCampaign from './pages/Brand/campaing/BrandCampaign'
import ReviewPost from './pages/Admin/ReviewPost/ReviewPost'
import Dashboard from './pages/Admin/Dashboard'



function App() {


  return (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />


        {/* user route */}
        <Route path='/customer' element={<UserBase />}>
          <Route path='home' element={<UserHome />} />
          <Route path='dashboard' element={<UserDashboard />} />
          <Route path='campaign' element={<Campaign />} />
          <Route path='cashback' element={<Cashback />} />
        </Route>
        {/* user route end */}

        {/* admin route start */}
        <Route path='/admin' element={<AdminBase />}>
          <Route path='home' element={<AdminHome />} >
            {/* here dashboard */}
            <Route path='dashboard' element={<Dashboard />} />

          </Route>

          <Route path='accept-url' element={<ReviewPost />} />
        </Route>

        {/* admin route end */}

        {/* brand route start */}
        <Route path='/brand' element={<BrandBase />}>
          <Route path='home' element={<BrandHome />} >
            <Route path='dashboard' element={<BrandDashboard />} />
            <Route path="loadmoney" element={<LoadMoney />} />

          </Route>
          <Route path='campaing' element={<BrandCampaign />} />

        </Route>
        {/* brand route end */}

      </Routes>
      <Footer />
    </>
  )
}

export default App
