import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminHome = () => {
    return (
        <>
            <div className="d-flex ">
                {/* navbar start  */}
                <nav className="navbar-dark navbar-expand-lg bg-color  left-side">
                    <div className="" id="navbarSupportedContent">
                        <ul className="navbar-nav d-block  mb-lg-0 ">
                            <li className="nav-item">
                                <NavLink to='/user/home' className="nav-link"  >Dashboard</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/user/home' className="nav-link"  >User</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to='/user/home' className="nav-link"  >Brand</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/user/home' className="nav-link"  >Account Approve</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/user/home' className="nav-link"  >Account</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/user/home' className="nav-link"  >Setting</NavLink>
                            </li>
            

                         
                        </ul>

                    </div>

                </nav>

                {/* navbar end */}

                <div className="container right-side">
                    <h1>hello</h1>
                </div>
            </div>



        </>
    )
}

export default AdminHome
