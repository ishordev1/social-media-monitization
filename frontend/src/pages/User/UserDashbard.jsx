import React from 'react';


const UserDashboard = () => {
  // Website User Profile Data
  const websiteUser = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    joinDate: "March 2022",
    lastLogin: "2 hours ago",
    accountType: "Premium",
    profileComplete: 85
  };

  // Instagram Profile Data
  const instagramProfile = {
    username: "alex_travels",
    fullName: "Alex Travels",
    bio: "Travel Photographer | Content Creator | Exploring the world 🌍",
    followers: 12450,
    following: 342,
    posts: 215,
    avgLikes: 1250,
    avgComments: 85,
    engagementRate: 4.2,
    highlights: [
      { name: "Travels", count: 12 },
      { name: "Food", count: 8 },
      { name: "Cities", count: 15 }
    ]
  };

  // Calculate Score with more sophisticated formula
  const calculateScore = () => {
    const followerScore = Math.min(instagramProfile.followers / 100, 100);
    const engagementScore = (instagramProfile.avgLikes * 0.5) + (instagramProfile.avgComments * 1.5);
    const postQualityScore = Math.min(instagramProfile.posts * 0.2, 30);
    return Math.min(Math.round(followerScore + engagementScore + postQualityScore), 1000);
  };

  const userScore = calculateScore();
  const scorePercentage = Math.min((userScore / 1000) * 100, 100);

  // Determine score level
  const getScoreLevel = () => {
    if (userScore >= 800) return { label: "Elite", color: "gold" };
    if (userScore >= 600) return { label: "Pro", color: "purple" };
    if (userScore >= 400) return { label: "Advanced", color: "blue" };
    if (userScore >= 200) return { label: "Intermediate", color: "teal" };
    return { label: "Beginner", color: "green" };
  };

  const scoreLevel = getScoreLevel();

  return (
    <div className="container py-4 dashboard-container">
      <div className="row">
        {/* Website Profile Section */}
        <div className="col-lg-4 mb-4">
          <div className="card profile-card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0"><i className="bi bi-person-badge me-2"></i>Website Profile</h5>
            </div>
            <div className="card-body">
              <div className="text-center mb-3">
                <img
                  src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
                  alt="Profile"
                  className="profile-img"
                />
                <h4 className="mt-3 mb-1">{websiteUser.name}</h4>
                <span className="badge bg-success">{websiteUser.accountType}</span>
              </div>

              <div className="profile-details">
                <div className="detail-item">
                  <i className="bi bi-envelope"></i>
                  <div>
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{websiteUser.email}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <i className="bi bi-calendar"></i>
                  <div>
                    <span className="detail-label">Member Since</span>
                    <span className="detail-value">{websiteUser.joinDate}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <i className="bi bi-clock-history"></i>
                  <div>
                    <span className="detail-label">Last Login</span>
                    <span className="detail-value">{websiteUser.lastLogin}</span>
                  </div>
                </div>
              </div>

              <div className="profile-completion mt-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Profile Completion</span>
                  <span>{websiteUser.profileComplete}%</span>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div
                    className="progress-bar bg-info"
                    role="progressbar"
                    style={{ width: `${websiteUser.profileComplete}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instagram Profile Section */}
        <div className="col-lg-8 mb-4">
          <div className="card instagram-card shadow-lg">
            <div className="card-header instagram-header">
              <h5 className="mb-0"><i className="bi bi-instagram me-2"></i>Instagram Profile</h5>
            </div>
            <div className="card-body">
              <div className="instagram-profile-header">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Instagram Profile"
                  className="instagram-profile-img"
                />
                <div className="instagram-profile-info">
                  <h3>@{instagramProfile.username}</h3>
                  <p className="instagram-bio">{instagramProfile.bio}</p>
                </div>
              </div>

              <div className="instagram-stats">
                <div className="stat-item">
                  <div className="stat-number">{instagramProfile.posts}</div>
                  <div className="stat-label">Posts</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{instagramProfile.followers.toLocaleString()}</div>
                  <div className="stat-label">Followers</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{instagramProfile.following}</div>
                  <div className="stat-label">Following</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{instagramProfile.engagementRate}%</div>
                  <div className="stat-label">Engagement</div>
                </div>
              </div>

              <div className="instagram-highlights mt-4">
                <h6 className="section-title">Profile Highlights</h6>
                <div className="highlights-container">
                  {instagramProfile.highlights.map((highlight, index) => (
                    <div key={index} className="highlight-item">
                      <div className="highlight-circle">
                        <span>{highlight.count}</span>
                      </div>
                      <div className="highlight-name">{highlight.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Influencer Score Section - Below Profiles */}
      <div className="row">
        <div className="col-12">
          <div className="card score-card shadow-lg">
            <div className="card-header score-header">
              <h4 className="mb-0"><i className="bi bi-graph-up-arrow me-2"></i>Influence Analytics</h4>
            </div>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-4 text-center">
                  <div className="score-main">
                    <div className="score-circle" data-percentage={scorePercentage}>
                      <div className="circle-progress">
                        <span className="score-value">{userScore}</span>
                        <div className="score-label">Total Score</div>
                      </div>
                    </div>
                    <div className={`score-level badge bg-${scoreLevel.color}`}>
                      {scoreLevel.label} Influencer
                    </div>
                  </div>
                </div>

                <div className="col-md-8">
                  <div className="score-metrics">
                    <h5 className="metrics-title">Performance Breakdown</h5>

                    <div className="metric-item">
                      <div className="metric-info">
                        <span className="metric-name">Follower Base</span>
                        <span className="metric-value">{instagramProfile.followers.toLocaleString()}</span>
                      </div>
                      <div className="progress" style={{ height: "6px" }}>
                        <div
                          className="progress-bar bg-success"
                          style={{ width: `${Math.min(instagramProfile.followers / 200, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="metric-item">
                      <div className="metric-info">
                        <span className="metric-name">Engagement Rate</span>
                        <span className="metric-value">{instagramProfile.engagementRate}%</span>
                      </div>
                      <div className="progress" style={{ height: "6px" }}>
                        <div
                          className="progress-bar bg-info"
                          style={{ width: `${instagramProfile.engagementRate * 5}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="metric-item">
                      <div className="metric-info">
                        <span className="metric-name">Content Quality</span>
                        <span className="metric-value">
                          {Math.round((instagramProfile.avgLikes / instagramProfile.followers * 100))}%
                        </span>
                      </div>
                      <div className="progress" style={{ height: "6px" }}>
                        <div
                          className="progress-bar bg-warning"
                          style={{ width: `${Math.min(instagramProfile.avgLikes / instagramProfile.followers * 500, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="metric-item">
                      <div className="metric-info">
                        <span className="metric-name">Post Frequency</span>
                        <span className="metric-value">{instagramProfile.posts} posts</span>
                      </div>
                      <div className="progress" style={{ height: "6px" }}>
                        <div
                          className="progress-bar bg-danger"
                          style={{ width: `${Math.min(instagramProfile.posts / 2, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="score-tips mt-4">
                <h6><i className="bi bi-lightbulb me-2"></i>Tips to Improve Your Score:</h6>
                <ul>
                  <li>Post consistently (aim for 3-5 times per week)</li>
                  <li>Engage with your followers through comments and stories</li>
                  <li>Use relevant hashtags to reach new audiences</li>
                  <li>Collaborate with other creators in your niche</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;