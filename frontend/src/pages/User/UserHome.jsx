import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const UserHome = () => {
  return (
    <>
      <div className="d-flex">
        {/* navbar start  */}
        <nav className="navbar-dark navbar-expand-lg bg-color left-side ">
          <div className="" id="navbarSupportedContent">
            <ul className="navbar-nav d-block  mb-lg-0 ">
              <li className="nav-item">
                <NavLink to='/user/home/dashboard' className="nav-link" >Dashboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/user/home/dashboard' className="nav-link" >Url Submittion</NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Sponsor</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Insta Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Account</a>
              </li>

              <li className="nav-item">
                <a className="nav-link " >setting</a>
              </li>
            </ul>

          </div>

        </nav>

        {/* navbar end */}

        <div className="container right-side">
         <Outlet/>
        </div>
      </div>



    </>
  )
}

export default UserHome
