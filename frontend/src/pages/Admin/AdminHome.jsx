import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminHome = () => {
    return (
        <>
            <div className="d-flex">
                {/* navbar start  */}
                <nav className="navbar-dark navbar-expand-lg bg-primary  m-0 p-0">
                    <div className="" id="navbarSupportedContent">
                        <ul className="navbar-nav d-block  mb-lg-0 ">
                            <li className="nav-item">
                                <NavLink to='/user/home' className="nav-link" aria-current="page" >Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link " aria-disabled="true">Disabled</a>
                            </li>
                        </ul>

                    </div>

                </nav>

                {/* navbar end */}

                <div className="container">
                    <h1>hello</h1>
                </div>
            </div>



        </>
    )
}

export default AdminHome
