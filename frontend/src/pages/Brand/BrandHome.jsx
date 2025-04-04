import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const BrandHome = () => {
  return (
    <div className="d-flex bg-color" >
      {/* navbar start  */}
      <nav className="navbar-dark navbar-expand-lg bg-color left-side ">
        <div className="" id="navbarSupportedContent">
          <ul className="navbar-nav d-block  mb-lg-0 ">
            <li className="nav-item">
              <NavLink to='/brand/home/dashboard' className="nav-link" >Dashboard</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/brand/home/loadmoney' className="nav-link" >Load money</NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/brand/campaign">Campaing</a>
            </li>

            <li className="nav-item">
              <a className="nav-link " >Analysic</a>
            </li>
            <li className="nav-item">
              <a className="nav-link " >Acount</a>
            </li>
            <li className="nav-item">
              <a className="nav-link " >Setting</a>
            </li>
          </ul>

        </div>

      </nav>

      {/* navbar end */}

      <div className="container right-side">
        <Outlet />
      </div>
    </div>
  )
}

export default BrandHome