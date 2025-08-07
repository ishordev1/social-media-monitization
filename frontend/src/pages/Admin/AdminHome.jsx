import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const AdminHome = () => {
    return (
        <>
            <div className="d-flex ">
                {/* navbar start  */}
                <nav className="navbar-dark navbar-expand-lg bg-color  left-side">
                    <div className="" id="navbarSupportedContent">
                        <ul className="navbar-nav d-block  mb-lg-0 ">
                            <li className="nav-item">
                                <NavLink to='/admin/home/dashboard' className="nav-link"  >Dashboard</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/admin/home/user' className="nav-link"  >User</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to='/admin/home/brand' className="nav-link"  >Brand</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/admin/home/accountrequest' className="nav-link"  >Account request</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/admin/home/account' className="nav-link"  >Account</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/admin/home/setting' className="nav-link"  >Setting</NavLink>
                            </li>



                        </ul>

                    </div>

                </nav>

                {/* navbar end */}

                <div className="container right-side">
                    <Outlet />
                </div>
            </div>



        </>
    )
}

export default AdminHome
