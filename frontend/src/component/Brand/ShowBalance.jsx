import React, { useState, useEffect } from 'react';
import { balanceInfo } from '../../../service/BalanceInfo';
import { getCurrentUserDetails } from '../../../auth/Index';


const ShowBalance = () => {
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
                    setError(" Balance Rs:0.00");
                })

        }
    }, []);

    if (!balanceData) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <div className="alert alert-info">No balance information available</div>
            </div>
        );
    }



    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-primary text-white">
                            <h2 className="card-title mb-0">Account test Balance Summary</h2>
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
    );
};

export default ShowBalance;