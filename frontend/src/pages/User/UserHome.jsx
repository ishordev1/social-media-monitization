import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { getCurrentUserDetails } from '../../auth/Index';
import { getUserScore } from '../../service/UserService';
import { toast } from 'react-toastify';
import './UserHome.css';

const UserHome = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    joinDate: "",
    lastLogin: "",
    accountType: "",
    profileComplete: 0,
    instaUsername: "",
    followers: 0,
    following: 0,
    posts: 0,
    bio: "",
    profilePic: "",
    averageLikes: 0,
    averageComments: 0,
    engagementRate: 0,
    recentPosts: [],
  });

  useEffect(() => {
    const user = getCurrentUserDetails();

    if (user) {
      setUserData(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
        joinDate: user.joinDate,
        lastLogin: "2 hours ago",
        accountType: user.role,
        profileComplete: 85,
        instaUsername: user.instaUsername,
      }));

      getUserScore(user.instaUsername)
        .then((response) => {
          if (response.status === "ok" && response.data.user) {
            const userData = response.data.user;
            const formattedData = formatInstagramData(userData);
            setUserData(prev => ({ ...prev, ...formattedData }));
          }
        })
        .catch((error) => {
          console.error("Error fetching user score:", error);
          toast.error("Error fetching user data. Please try again later.");
        });
    }
  }, []);

  const formatInstagramData = (apiData) => {
    const formatted = {
      followers: apiData.edge_followed_by?.count || 0,
      following: apiData.edge_follow?.count || 0,
      posts: apiData.edge_owner_to_timeline_media?.count || 0,
      bio: apiData.biography || "No bio available",
      profilePic: apiData.profile_pic_url_hd || apiData.profile_pic_url || "https://randomuser.me/api/portraits/men/32.jpg",
      averageLikes: 0,
      averageComments: 0,
      engagementRate: 0,
      recentPosts: [],
    };

    const posts = apiData.edge_owner_to_timeline_media?.edges || [];
    if (posts.length > 0) {
      let totalLikes = 0;
      let totalComments = 0;

      formatted.recentPosts = posts.slice(0, 6).map(post => {
        const likes = post.node.edge_liked_by?.count || 0;
        const comments = post.node.edge_media_to_comment?.count || 0;
        totalLikes += likes;
        totalComments += comments;

        return {
          likes,
          comments,
          thumbnail: post.node.thumbnail_src || post.node.display_url,
          shortcode: post.node.shortcode,
          isVideo: post.node.is_video,
        };
      });

      formatted.averageLikes = Math.round(totalLikes / posts.length);
      formatted.averageComments = Math.round(totalComments / posts.length);
      formatted.engagementRate = formatted.followers > 0
        ? ((totalLikes + totalComments) / posts.length / formatted.followers * 100).toFixed(2)
        : 0;
    }

    return formatted;
  };

  const calculateScore = () => {
    const followerScore = Math.min(userData.followers / 100, 100);
    const engagementScore = (userData.averageLikes * 0.5) + (userData.averageComments * 1.5);
    const postQualityScore = Math.min(userData.posts * 0.2, 30);
    return Math.min(Math.round(followerScore + engagementScore + postQualityScore), 1000);
  };

  const userScore = calculateScore();
  const scorePercentage = Math.min((userScore / 1000) * 100, 100);

  const getScoreLevel = () => {
    if (userScore >= 800) return { label: "Elite", color: "gold" };
    if (userScore >= 600) return { label: "Pro", color: "purple" };
    if (userScore >= 400) return { label: "Advanced", color: "blue" };
    if (userScore >= 200) return { label: "Intermediate", color: "teal" };
    return { label: "Beginner", color: "green" };
  };

  const scoreLevel = getScoreLevel();

  return (
    <div className="user-home-container">
      <div className="profile-header">
        <div className="profile-main">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"

            alt="Profile"
            className="profile-avatar"
          />
          <div className="profile-info">
            <h1>{userData.name}</h1>
            <p className="username">@{userData.instaUsername}</p>
            <p className="bio">{userData.bio}</p>
            <div className="account-badge">{userData.accountType} Account</div>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-number">{userData.posts}</span>
            <span className="stat-label">Posts</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{userData.followers.toLocaleString()}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{userData.following}</span>
            <span className="stat-label">Following</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{userData.engagementRate}%</span>
            <span className="stat-label">Engagement</span>
          </div>
        </div>
      </div>

      <div className="content-grid">
        <div className="profile-details-card">
          <h3>Account Details</h3>
          <div className="detail-item">
            <span className="detail-label">Email:</span>
            <span>{userData.email}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Member Since:</span>
            <span>{userData.joinDate}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Last Active:</span>
            <span>{userData.lastLogin}</span>
          </div>
          <div className="progress-container">
            <div className="progress-label">
              <span>Profile Completion</span>
              <span>{userData.profileComplete}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${userData.profileComplete}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="influence-card">
          <h3>Influence Score</h3>
          <div className="score-display">
            <div className="score-circle">
              <div className="circle-progress" style={{ '--percentage': scorePercentage }}>
                <span className="score-value">{userScore}</span>
              </div>
              <div className={`score-level ${scoreLevel.color}`}>
                {scoreLevel.label}
              </div>
            </div>
            <div className="score-details">
              <div className="score-metric">
                <span>Follower Quality</span>
                <div className="metric-bar">
                  <div style={{ width: `${Math.min(userData.followers / 1000, 100)}%` }}></div>
                </div>
              </div>
              <div className="score-metric">
                <span>Content Engagement</span>
                <div className="metric-bar">
                  <div style={{ width: `${Math.min((userData.averageLikes + userData.averageComments) / 50, 100)}%` }}></div>
                </div>
              </div>
              <div className="score-metric">
                <span>Post Consistency</span>
                <div className="metric-bar">
                  <div style={{ width: `${Math.min(userData.posts / 10, 100)}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="recent-posts-card">
          <h3>Recent Activity</h3>
          {userData.recentPosts.length > 0 ? (
            <div className="posts-grid">
              {userData.recentPosts.map((post, index) => (
                <div key={index} className="post-thumbnail">
                  <img src={post.thumbnail} alt={`Post ${index}`} />
                  <div className="post-stats">
                    <span>♥ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-posts">No recent posts available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHome;