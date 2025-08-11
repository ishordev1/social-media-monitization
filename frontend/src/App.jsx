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
import { ToastContainer } from 'react-toastify'

import Campaign from './pages/User/Campaign'
import Cashback from './pages/User/Cashback'
import BrandDashboard from './pages/Brand/dashboard/BrandDashboard'
import LoadMoney from './pages/Brand/loadMoney/LoadMoney'
import BrandCampaign from './pages/Brand/campaing/BrandCampaign'
import ReviewPost from './pages/Admin/ReviewPost/ReviewPost'
import Dashboard from './pages/Admin/Dashboard'
import Profile from './pages/User/Profile'
import ShowCamppaignByBrand from './pages/User/ShowCampaignByBrand'
import AllCampaign from './pages/Brand/AllCampaign'
import ShowCampaignDetails from './pages/Brand/ShowCampaignDetails'
import ShowUser from './pages/Admin/ShowUser'
import ShowBrands from './pages/Admin/ShowBrands'




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
          <Route path='campaign' element={<Campaign />} />
          <Route path='cashback' element={<Cashback />} />
          <Route path='profile' element={<Profile />} />
          <Route path='brand/:brandId' element={<ShowCamppaignByBrand />} />
        </Route>
        {/* user route end */}

        {/* admin route start */}
        <Route path='/admin' element={<AdminBase />}>
          <Route path='home' element={<AdminHome />} >
            {/* here dashboard */}
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='review-post' element={<ReviewPost />} />
            <Route path="user" element={<ShowUser/>}/>
            <Route path="brand" element={<ShowBrands />} />
          </Route>
        </Route>

        {/* admin route end */}

        {/* brand route start */}
        <Route path='/brand' element={<BrandBase />}>
          <Route path='home' element={<BrandHome />} >
            <Route path='dashboard' element={<BrandDashboard />} />
            <Route path="loadmoney" element={<LoadMoney />} />
            <Route path="allcampaign" element={<AllCampaign />} />
            <Route path="campaign/view/:campaignId" element={<ShowCampaignDetails />} />

            <Route path='addcampaign' element={<BrandCampaign />} />
          </Route>

        </Route>
        {/* brand route end */}

      </Routes>
      <Footer />
    </>
  )
}

export default App
