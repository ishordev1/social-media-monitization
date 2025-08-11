import React, { useState, useEffect } from 'react';
import { balanceInfo } from '../../../service/BalanceInfo';
import { getCurrentUserDetails } from '../../../auth/Index';
import './BrandDashboard.css';

const BrandDashboard = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [balanceData, setBalanceData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const user = getCurrentUserDetails();
        setCurrentUser(user);

        if (user) {
            balanceInfo(user.userId)
                .then((response) => {
                    setBalanceData(response);
                })
                .catch((error) => {
                    console.error(error);
                    setError(" error");
                })

        }
    }, []);

    if (!balanceData) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <div className="alert alert-info">Balance Rs: 0.00</div>
            </div>
        );
    }



    return (
<>

 <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Dashboard</h3>
        <div className="d-flex">

          <button className="btn btn-primary me-2 d-flex align-items-center">
      <i className="fas fa-plus me-1"></i> Money
    </button>
         
        </div>
      </div>

      {/* Cards Row */}
      <div className="row g-3">
        {/* Total Campaigns */}
        <div className="col-md-3">
          <div className="card shadow-sm border-0 p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <small className="text-muted">Total Campaigns</small>
                <h4 className="fw-bold">6</h4>
              </div>
              <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                <i className="fas fa-bullhorn text-primary"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Total Funds */}
        <div className="col-md-3">
          <div className="card shadow-sm border-0 p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <small className="text-muted">Total Funds</small>
                <h4 className="fw-bold text-success">$102,000</h4>
              </div>
              <div className="bg-success bg-opacity-10 p-3 rounded-circle">
                <i className="fas fa-money-bill text-success"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Distributed */}
        <div className="col-md-3">
          <div className="card shadow-sm border-0 p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <small className="text-muted">Distributed</small>
                <h4 className="fw-bold text-purple">$59,950</h4>
              </div>
              <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                <i className="fas fa-hand-holding-usd text-primary"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Total Users */}
        <div className="col-md-3">
          <div className="card shadow-sm border-0 p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <small className="text-muted">Total Users</small>
                <h4 className="fw-bold text-warning">1,465</h4>
              </div>
              <div className="bg-warning bg-opacity-10 p-3 rounded-circle">
                <i className="fas fa-users text-warning"></i>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
        
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-primary text-white">
                            <h2 className="card-title mb-0">Account Balance Summary</h2>
                        </div>
                        <div className="card-body">
                            <div className="balance-item mb-4 p-3 rounded bg-light">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h3 className="h5 text-muted mb-1">Total Balance</h3>
                                        <p className="h3 text-primary mb-0">${balanceData.totalBalance.toFixed(2)}</p>
                                    </div>
                                    <div className="badge bg-primary bg-opacity-10 text-primary fs-6">
                                        <i className="bi bi-wallet2 me-2"></i>Total
                                    </div>
                                </div>
                            </div>

                            <div className="balance-item mb-4 p-3 rounded bg-light">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h3 className="h5 text-muted mb-1">Spent Balance</h3>
                                        <p className="h3 text-danger mb-0">${balanceData.spendBalance.toFixed(2)}</p>
                                    </div>
                                    <div className="badge bg-danger bg-opacity-10 text-danger fs-6">
                                        <i className="bi bi-currency-exchange me-2"></i>Spent
                                    </div>
                                </div>
                            </div>

                            <div className="balance-item mb-4 p-3 rounded bg-light">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h3 className="h5 text-muted mb-1">Available Balance</h3>
                                        <p className="h3 text-success mb-0">${balanceData.totalBalance.toFixed(2)}</p>
                                    </div>
                                    <div className="badge bg-success bg-opacity-10 text-success fs-6">
                                        <i className="bi bi-cash-stack me-2"></i>Available
                                    </div>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <div className="account-info">
                                <h3 className="h5 mb-3">Account Details</h3>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <p className="text-muted mb-1">Brand Name</p>
                                        <p className="fw-bold">{currentUser?.name || 'N/A'}</p>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <p className="text-muted mb-1">Email</p>
                                        <p className="fw-bold">{currentUser?.email || 'N/A'}</p>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <p className="text-muted mb-1">Instagram</p>
                                        <p className="fw-bold">@{currentUser?.instaUsername || 'N/A'}</p>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <p className="text-muted mb-1">Status</p>
                                        <p className="fw-bold text-capitalize">{currentUser?.status?.toLowerCase() || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer bg-light text-center">
                            <small className="text-muted">Last updated: {new Date().toLocaleString()}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default BrandDashboard;