import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { doLogout, getCurrentUserDetails, isLoggedIn } from '../auth/Index';

const Navbar = () => {
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        setLogin(isLoggedIn());
        setUser(getCurrentUserDetails());
    }, []);

    const logout = () => {
        doLogout(() => {
            setLogin(false);
            setUser(undefined);
            navigate('/');
        });
    };

    // Role assignment with safety check
    let role = user?.role?.toLowerCase() || "customer";

    return (
        <div className="container-fluid bg-color">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Logo</a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {!login &&
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/">Home</NavLink>
                                    </li>

                                }

                                {/* Customer Navigation */}
                                {login && role === "customer" && (
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/customer/home">Home</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/customer/dashboard">Your Score</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/customer/campaign">All Campaign</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/customer/cashback">cash back</NavLink>
                                        </li>
                                    </>
                                )}

                                {/* Admin Navigation */}
                                {login && role === "admin" && (
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/admin/home">Home</NavLink>
                                        </li>
                                        {/* <li className="nav-item">
                                            <NavLink className="nav-link" to="/admin/dashboard">Dashboard</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/admin/users">Users</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/admin/reports">Reports</NavLink>
                                        </li> */}
                                    </>
                                )}

                                {/* Brand Navigation */}
                                {login && role === "brand" && (
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/brand/home">Home</NavLink>
                                        </li>
                                        {/* <li className="nav-item">
                                            <NavLink className="nav-link" to="/brand/products">Manage Products</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/brand/sales">Sales</NavLink>
                                        </li> */}
                                    </>
                                )}
                            </ul>

                            {/* User Authentication Section */}
                            {login ? (
                                <>
                                    <span className="text-white mx-2">{user?.email}</span>
                                    <button className="btn btn-danger mx-2" onClick={logout}>Logout</button>
                                </>
                            ) : (
                                <>
                                    <NavLink to="/signin" className="btn btn-success mx-2">Login</NavLink>
                                    <NavLink to="/signup" className="btn btn-warning">Signup</NavLink>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
