import React from 'react';
import './AdminUserDashboard.css'; 

const AdminUserDashboard = ({
    totalUsers = 10,
    pendingUsers = 10,
    verifiedUsers = 10
}) => { 
    return (
        <div className="container mb-4 rounded bg-dark">
            <h2 className="text-center dashboard-title bg-primary rounded p-2 ">User Dashboard</h2>
            <div className="row rounded g-4 justify-content-center mt-1 mb-6 ">
                {/* Total Users Card */}
                <div className="col-md-6 col-lg-3">
                    <div className="card dashboard-card total-card shadow-lg border-0">
                        <div className="card-body text-center p-4">
                            <div className="icon-wrapper mb-3">
                                <i className="fas fa-users fa-3x text-white"></i>
                            </div>
                            <h5 className="card-title text-white mb-2">Total Users</h5>
                            {totalUsers > 0 ? (
                                <h3 className="card-value fade-in text-white fw-bold">{totalUsers.toLocaleString()}</h3>
                            ) : (
                                <p className="text-white-50">No data available</p>
                            )}
                            <small className="text-white-75">All registered users</small>
                        </div>
                    </div>
                </div>

                {/* Pending Users Card */}
                <div className="col-md-6 col-lg-3">
                    <div className="card dashboard-card pending-card shadow-lg border-0">
                        <div className="card-body text-center p-4">
                            <div className="icon-wrapper pulse-icon mb-3">
                                <i className="fas fa-hourglass-half fa-3x text-white"></i>
                            </div>
                            <h5 className="card-title text-white mb-2">Pending Users</h5>
                            {pendingUsers > 0 ? (
                                <h3 className="card-value text-white fw-bold">{pendingUsers.toLocaleString()}</h3>
                            ) : (
                                <p className="text-white-50">No data available</p>
                            )}
                            <small className="text-white-75">Awaiting verification</small>
                        </div>
                    </div>
                </div>

                {/* Verified Users Card */}
                <div className="col-md-6 col-lg-3">
                    <div className="card dashboard-card verified-card shadow-lg border-0">
                        <div className="card-body text-center p-4">
                            <div className="icon-wrapper bounce-in mb-3">
                                <i className="fas fa-user-check fa-3x text-white"></i>
                            </div>
                            <h5 className="card-title text-white mb-2">Verified Users</h5>
                            {verifiedUsers > 0 ? (
                                <h3 className="card-value text-white fw-bold">{verifiedUsers.toLocaleString()}</h3>
                            ) : (
                                <p className="text-white-50">No data available</p>
                            )}
                            <small className="text-white-75">Fully verified accounts</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUserDashboard;
