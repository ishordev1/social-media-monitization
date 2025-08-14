import React, { useState, useEffect } from "react";
import { balanceInfo } from "../../../service/BalanceInfo";
import { getCurrentUserDetails } from "../../../auth/Index";
import "./BrandDashboard.css";

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
          setError("Error fetching balance");
        });
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
      {/* Welcome Section */}
      <div className="container mt-4">
        <div className="mb-4 p-4 bg-gradient-primary text-white rounded shadow-sm d-flex align-items-center justify-content-between">
          <div>
            <h2 className="fw-bold">
              Welcome back, {currentUser?.name || "Brand"} 👋
            </h2>
            <p className="mb-0">
              Manage your campaigns, monitor funds, and track influencer
              performance!
            </p>
          </div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg-gUue-TV9q4Y2DIc25Fb1mkM1HvdZprmuggJHlW3LlYQOfujtDW7C-lmMNSTOf09DsM&usqp=CAU"
            alt="brand logo"
            className="rounded-circle border shadow-sm"
            width="70"
            height="70"
          />
        </div>

       
        {/* Unique Glassmorphism Balance Section */}
        <div className=" balance-glass card border-0 shadow-lg">
          <div className="card-body p-4">
            {/* Top Row */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="mb-1 text-white-50">Account Balance</h5>
                <h2 className="fw-bold text-white mb-0">
                  ${(balanceData.totalBalance).toFixed(2)}
                </h2>
              </div>
              <button className="btn btn-light btn-sm rounded-pill px-3 glass-btn">
                <i className="bi bi-wallet2 me-1"></i>Add Funds
              </button>
            </div>

            {/* KPI Row */}
            <div className="row g-3 mt-1">
              <div className="col-12 col-md-4">
                <div className="kpi-tile kpi-total d-flex align-items-center">
                  <div className="kpi-icon me-2">
                    <i className="bi bi-graph-up-arrow"></i>
                  </div>
                  <div className="kpi-text">
                    <small className="text-white-50 d-block">Total</small>
                    <span className="kpi-value text-danger">
                      ${(balanceData.totalBalance).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="kpi-tile kpi-spent d-flex align-items-center">
                  <div className="kpi-icon me-2">
                    <i className="bi bi-currency-exchange"></i>
                  </div>
                  <div className="kpi-text">
                    <small className="text-white-50 d-block">Spent</small>
                    <span className="kpi-value text-danger-emphasis">
                      ${(balanceData.spendBalance).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="kpi-tile kpi-available d-flex align-items-center">
                  <div className="kpi-icon me-2">
                    <i className="bi bi-cash-stack"></i>
                  </div>
                  <div className="kpi-text">
                    <small className="text-white-50 d-block">Available</small>
                    <span className="kpi-value text-success-emphasis">
                      ${(balanceData.totalBalance - balanceData.spendBalance).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="d-flex justify-content-between align-items-center mt-4 pt-2 border-top border-white-10">
              <small className="text-white-50">
                Last updated: {new Date().toLocaleString()}
              </small>
              <div className="d-flex gap-2">
                <span className="badge rounded-pill chip chip-outline">Finance</span>
                <span className="badge rounded-pill chip chip-outline">Live</span>
              </div>
            </div>
          </div>
       
        </div>
 {/* Stats Row */}
        <div className="row g-4 mt-1">
          <div className="col-md-3">
            <div className="card stat-card shadow-sm border-0">
              <div className="card-body text-center">
                <i
                  className="fas fa-bullhorn text-primary mb-2"
                  style={{ fontSize: "2rem" }}
                ></i>
                <h5 className="text-muted">Total Campaigns</h5>
                <h4 className="fw-bold">6</h4>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card stat-card shadow-sm border-0">
              <div className="card-body text-center">
                <i
                  className="fas fa-money-bill text-success mb-2"
                  style={{ fontSize: "2rem" }}
                ></i>
                <h5 className="text-muted">Total Funds</h5>
                <h4 className="fw-bold text-success">$102,000</h4>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card stat-card shadow-sm border-0">
              <div className="card-body text-center">
                <i
                  className="fas fa-hand-holding-usd text-primary mb-2"
                  style={{ fontSize: "2rem" }}
                ></i>
                <h5 className="text-muted">Distributed</h5>
                <h4 className="fw-bold">$59,950</h4>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card stat-card shadow-sm border-0">
              <div className="card-body text-center">
                <i
                  className="fas fa-users text-warning mb-2"
                  style={{ fontSize: "2rem" }}
                ></i>
                <h5 className="text-muted">Total Users</h5>
                <h4 className="fw-bold text-warning">1,465</h4>
              </div>
            </div>
          </div>
        </div>


        {/* Recent Activity */}
        <div className="card shadow-sm border-0 mt-5 mb-2">
          <div className="card-header bg-white">
            <h5 className="mb-0">📢 Recent Activities</h5>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">✅ Campaign "Summer Promo" launched - 2 days ago</li>
              <li className="list-group-item">💸 Distributed funds to 5 influencers - 5 days ago</li>
              <li className="list-group-item">📊 Viewed campaign performance report - 1 week ago</li>
            </ul>
          </div>
        </div>

      
      </div>
    </>
  );
};

export default BrandDashboard;
