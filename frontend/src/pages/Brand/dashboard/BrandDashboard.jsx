import React, { useState, useEffect } from "react";
import { balanceInfo } from "../../../service/BalanceInfo";
import { getCurrentUserDetails } from "../../../auth/Index";
import "./BrandDashboard.css";
import BrandBalanceDashboard from "../../../component/Brand/BrandBalanceDashboard";

const BrandDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const user = getCurrentUserDetails();
    setCurrentUser(user);

  }, []);


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

       <BrandBalanceDashboard/>
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
                <h5 className="text-muted">Active Campaign</h5>
                <h4 className="fw-bold text-success">20</h4>
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
                <h5 className="text-muted">Draft Campaign</h5>
                <h4 className="fw-bold">50</h4>
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
