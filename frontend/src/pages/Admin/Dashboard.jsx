import React from 'react'
import './Dashboard.css'
const Dashboard = () => {
    // Static data - you can replace with API calls later
    const dashboardStats = {
        totalBrands: 45,
        activeCampaigns: 28,
        totalCustomers: 1250,
        totalRevenue: 89500,
        pendingVerifications: 15,
        completedPosts: 340,
        avgEngagementRate: 4.2,
        monthlyGrowth: 12.5
    }

    const topBrands = [
        { id: 1, name: "TechGadgets Pro", campaigns: 8, revenue: 15000, engagement: 5.2 },
        { id: 2, name: "Fashion Forward", campaigns: 12, revenue: 22000, engagement: 6.1 },
        { id: 3, name: "Home Essentials", campaigns: 6, revenue: 8500, engagement: 3.8 },
        { id: 4, name: "Fitness Gear", campaigns: 10, revenue: 12000, engagement: 4.9 },
        { id: 5, name: "Beauty Bliss", campaigns: 15, revenue: 18500, engagement: 7.2 }
    ]

    const recentActivities = [
        { id: 1, type: "new_brand", message: "Fashion Forward joined the platform", time: "2 hours ago", icon: "fas fa-plus-circle", color: "success" },
        { id: 2, type: "campaign_complete", message: "TechGadgets Pro campaign ended", time: "4 hours ago", icon: "fas fa-check-circle", color: "primary" },
        { id: 3, type: "verification_pending", message: "15 posts waiting for verification", time: "6 hours ago", icon: "fas fa-clock", color: "warning" },
        { id: 4, type: "payout_processed", message: "₹25,000 cashback processed", time: "1 day ago", icon: "fas fa-money-bill-wave", color: "info" },
        { id: 5, type: "complaint_resolved", message: "Customer complaint resolved", time: "2 days ago", icon: "fas fa-exclamation-triangle", color: "danger" }
    ]

    const campaignPerformance = [
        { month: "Jan", posts: 45, engagement: 3.2, revenue: 12000 },
        { month: "Feb", posts: 62, engagement: 4.1, revenue: 15500 },
        { month: "Mar", posts: 78, engagement: 4.8, revenue: 18200 },
        { month: "Apr", posts: 95, engagement: 5.2, revenue: 22000 },
        { month: "May", posts: 110, engagement: 4.9, revenue: 25800 }
    ]

    return (
        <div className="container-fluid py-4">
            {/* Header */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h2 className="mb-1  dashboard-title">
                                <i className="fas fa-tachometer-alt me-2 text-primary"></i>
                                Admin Dashboard
                            </h2>
                            <p className="text-muted mb-0">Social Media Monetization Platform Analytics</p>
                        </div>
                        <div className="d-flex gap-2">
                            <button className="btn btn-outline-primary btn-sm">
                                <i className="fas fa-download me-1"></i>Export Report
                            </button>
                            <button className="btn btn-primary btn-sm">
                                <i className="fas fa-sync-alt me-1"></i>Refresh
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards Row */}
            <div className="row g-4 mb-4">
                <div className="col-xl-3 col-md-6">
                    <div className="card border-0 shadow-sm summary-card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <p className="text-muted mb-1 small">Total Brands</p>
                                    <h3 className="mb-0 fw-bold text-primary">{dashboardStats.totalBrands}</h3>
                                </div>
                                <div className="bg-primary bg-opacity-10 rounded-3 d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>
                                    <i className="fas fa-building text-primary"></i>
                                </div>
                            </div>
                            <div className="mt-2">
                                <span className="badge bg-success-subtle text-success">+5 this month</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="card border-0 shadow-sm summary-card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <p className="text-muted mb-1 small">Active Campaigns</p>
                                    <h3 className="mb-0 fw-bold text-success">{dashboardStats.activeCampaigns}</h3>
                                </div>
                                <div className="bg-success bg-opacity-10 rounded-3 d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>
                                    <i className="fas fa-bullhorn text-success"></i>
                                </div>
                            </div>
                            <div className="mt-2">
                                <span className="badge bg-primary-subtle text-primary">12 new this week</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <p className="text-muted mb-1 small">Total Customers</p>
                                    <h3 className="mb-0 fw-bold text-info">{dashboardStats.totalCustomers.toLocaleString()}</h3>
                                </div>
                                <div className="bg-info bg-opacity-10 rounded-3 d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>
                                    <i className="fas fa-users text-info"></i>
                                </div>
                            </div>
                            <div className="mt-2">
                                <span className="badge bg-success-subtle text-success">+{dashboardStats.monthlyGrowth}% growth</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <p className="text-muted mb-1 small">Total Revenue</p>
                                    <h3 className="mb-0 fw-bold text-warning">₹{dashboardStats.totalRevenue.toLocaleString()}</h3>
                                </div>
                                <div className="bg-warning bg-opacity-10 rounded-3 d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>
                                    <i className="fas fa-rupee-sign text-warning"></i>
                                </div>
                            </div>
                            <div className="mt-2">
                                <span className="badge bg-success-subtle text-success">+₹15K this month</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Secondary Stats */}
            <div className="row g-4 mb-4">
                <div className="col-lg-3 col-md-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body text-center">
                            <i className="fas fa-clock text-warning fs-2 mb-2"></i>
                            <h4 className="fw-bold text-warning">{dashboardStats.pendingVerifications}</h4>
                            <p className="text-muted mb-0 small">Pending Verifications</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body text-center">
                            <i className="fas fa-image text-success fs-2 mb-2"></i>
                            <h4 className="fw-bold text-success">{dashboardStats.completedPosts}</h4>
                            <p className="text-muted mb-0 small">Completed Posts</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body text-center">
                            <i className="fas fa-heart text-danger fs-2 mb-2"></i>
                            <h4 className="fw-bold text-danger">{dashboardStats.avgEngagementRate}%</h4>
                            <p className="text-muted mb-0 small">Avg. Engagement</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body text-center">
                            <i className="fas fa-chart-line text-primary fs-2 mb-2"></i>
                            <h4 className="fw-bold text-primary">+{dashboardStats.monthlyGrowth}%</h4>
                            <p className="text-muted mb-0 small">Monthly Growth</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts and Tables Row */}
            <div className="row g-4 mb-4">
                {/* Top Brands Table */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white border-0 pt-4 pb-0">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0 fw-bold">
                                    <i className="fas fa-star text-warning me-2"></i>
                                    Top Performing Brands
                                </h5>
                                <div className="dropdown">
                                    <button className="btn btn-sm btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                        This Month
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">This Week</a></li>
                                        <li><a className="dropdown-item" href="#">This Month</a></li>
                                        <li><a className="dropdown-item" href="#">This Quarter</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Brand Name</th>
                                            <th>Campaigns</th>
                                            <th>Revenue</th>
                                            <th>Engagement</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topBrands.map((brand, index) => (
                                            <tr key={brand.id}>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                                            <i className="fas fa-building text-primary"></i>
                                                        </div>
                                                        <div>
                                                            <h6 className="mb-0">{brand.name}</h6>
                                                            <small className="text-muted">Rank #{index + 1}</small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge bg-light text-dark">{brand.campaigns}</span>
                                                </td>
                                                <td className="fw-bold text-success">₹{brand.revenue.toLocaleString()}</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="progress me-2" style={{width: '60px', height: '6px'}}>
                                                            <div className="progress-bar" style={{width: `${brand.engagement * 10}%`}}></div>
                                                        </div>
                                                        <small>{brand.engagement}%</small>
                                                    </div>
                                                </td>
                                                <td>
                                                    <button className="btn btn-sm btn-outline-primary">
                                                        <i className="fas fa-eye"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white border-0 pt-4 pb-0">
                            <h5 className="mb-0 fw-bold">
                                <i className="fas fa-bell text-info me-2"></i>
                                Recent Activities
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="timeline">
                                {recentActivities.map((activity) => (
                                    <div key={activity.id} className="d-flex mb-3">
                                        <div className={`bg-${activity.color} bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0`} style={{width: '40px', height: '40px'}}>
                                            <i className={`${activity.icon} text-${activity.color}`}></i>
                                        </div>
                                        <div className="flex-grow-1">
                                            <p className="mb-1 small">{activity.message}</p>
                                            <small className="text-muted">{activity.time}</small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-3">
                                <button className="btn btn-sm btn-outline-primary">View All Activities</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Campaign Performance Chart */}
            <div className="row g-4 mb-4">
                <div className="col-12">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white border-0 pt-4 pb-0">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0 fw-bold">
                                    <i className="fas fa-chart-bar text-primary me-2"></i>
                                    Campaign Performance Overview
                                </h5>
                                <div className="d-flex gap-2">
                                    <span className="badge bg-primary-subtle text-primary">
                                        <i className="fas fa-image me-1"></i>Posts
                                    </span>
                                    <span className="badge bg-success-subtle text-success">
                                        <i className="fas fa-heart me-1"></i>Engagement
                                    </span>
                                    <span className="badge bg-warning-subtle text-warning">
                                        <i className="fas fa-rupee-sign me-1"></i>Revenue
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th>Month</th>
                                            <th>Posts</th>
                                            <th>Engagement Rate</th>
                                            <th>Revenue</th>
                                            <th>Growth</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {campaignPerformance.map((data, index) => (
                                            <tr key={data.month}>
                                                <td className="fw-bold">{data.month} 2024</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="progress me-2" style={{width: '100px', height: '8px'}}>
                                                            <div className="progress-bar bg-primary" style={{width: `${(data.posts / 110) * 100}%`}}></div>
                                                        </div>
                                                        <span className="fw-bold">{data.posts}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="progress me-2" style={{width: '80px', height: '8px'}}>
                                                            <div className="progress-bar bg-success" style={{width: `${data.engagement * 15}%`}}></div>
                                                        </div>
                                                        <span>{data.engagement}%</span>
                                                    </div>
                                                </td>
                                                <td className="fw-bold text-warning">₹{data.revenue.toLocaleString()}</td>
                                                <td>
                                                    {index > 0 && (
                                                        <span className={`badge ${(data.revenue > campaignPerformance[index-1].revenue) ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                                                            <i className={`fas ${(data.revenue > campaignPerformance[index-1].revenue) ? 'fa-arrow-up' : 'fa-arrow-down'} me-1`}></i>
                                                            {index > 0 ? Math.abs(((data.revenue - campaignPerformance[index-1].revenue) / campaignPerformance[index-1].revenue * 100)).toFixed(1) : 0}%
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="row g-4">
                <div className="col-12">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white border-0 pt-4 pb-0">
                            <h5 className="mb-0 fw-bold">
                                <i className="fas fa-bolt text-warning me-2"></i>
                                Quick Actions
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="row g-3">
                                <div className="col-lg-2 col-md-4 col-6">
                                    <button className="btn btn-light w-100 p-3 d-flex flex-column align-items-center">
                                        <i className="fas fa-plus text-primary fs-4 mb-2"></i>
                                        <span className="small">Add Brand</span>
                                    </button>
                                </div>
                                <div className="col-lg-2 col-md-4 col-6">
                                    <button className="btn btn-light w-100 p-3 d-flex flex-column align-items-center">
                                        <i className="fas fa-check-circle text-success fs-4 mb-2"></i>
                                        <span className="small">Verify Posts</span>
                                    </button>
                                </div>
                                <div className="col-lg-2 col-md-4 col-6">
                                    <button className="btn btn-light w-100 p-3 d-flex flex-column align-items-center">
                                        <i className="fas fa-money-bill-wave text-warning fs-4 mb-2"></i>
                                        <span className="small">Process Payments</span>
                                    </button>
                                </div>
                                <div className="col-lg-2 col-md-4 col-6">
                                    <button className="btn btn-light w-100 p-3 d-flex flex-column align-items-center">
                                        <i className="fas fa-exclamation-triangle text-danger fs-4 mb-2"></i>
                                        <span className="small">Handle Complaints</span>
                                    </button>
                                </div>
                                <div className="col-lg-2 col-md-4 col-6">
                                    <button className="btn btn-light w-100 p-3 d-flex flex-column align-items-center">
                                        <i className="fas fa-chart-pie text-info fs-4 mb-2"></i>
                                        <span className="small">View Analytics</span>
                                    </button>
                                </div>
                                <div className="col-lg-2 col-md-4 col-6">
                                    <button className="btn btn-light w-100 p-3 d-flex flex-column align-items-center">
                                        <i className="fas fa-cog text-secondary fs-4 mb-2"></i>
                                        <span className="small">Settings</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
