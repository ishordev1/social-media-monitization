import React from 'react'
import SideBar from '../../component/User/SideBar'

const Home = () => {
  return (
    <>
   <div className="container-fluid d-flex" style={{padding:'0px'}}>
    {/* side bar */}
    <div className="bg-warning" style={{width:'100px', height:'100vh' }}>
    <SideBar/>
    </div>
{/* content show */}
<div className="bg-primary" style={{width:'400px'}}>
    <SideBar/>
    </div>
   </div>
    </>
  )
}

export default Home