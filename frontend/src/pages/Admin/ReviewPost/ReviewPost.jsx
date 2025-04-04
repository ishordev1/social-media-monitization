import React, { useState, useEffect } from 'react';
import { getAllRequestInstaPost, postReview } from '../../../service/InstaPostService';
import { getCurrentUserDetails } from '../../../auth/Index';
import { toast } from 'react-toastify';

const ReviewPost = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [instaPosts, setInstaPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAction, setSelectedAction] = useState({});
    const [processing, setProcessing] = useState({});

    useEffect(() => {
        const user = getCurrentUserDetails();
        setCurrentUser(user);
        fetchInstaPosts();
    }, []);

    const fetchInstaPosts = () => {
        setLoading(true);
        getAllRequestInstaPost()
            .then((response) => {
                setInstaPosts(response);
                // Initialize selected actions
                const actions = {};
                response.forEach(post => {
                    actions[post.instaPostId] = 'PENDING';
                });
                setSelectedAction(actions);
            })
            .catch((error) => {
                console.error("Error fetching Insta Posts:", error);
                toast.error("Failed to load posts");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleActionChange = (postId, value) => {
        setSelectedAction(prev => ({
            ...prev,
            [postId]: value
        }));
    };

    const handleSubmitReview = (postId) => {
        if (!currentUser?.userId) {
            toast.error("User not authenticated");
            return;
        }

        const action = selectedAction[postId];
        if (!action || action === 'PENDING') {
            toast.warning("Please select an action");
            return;
        }

        setProcessing(prev => ({ ...prev, [postId]: true }));

        postReview(currentUser.userId, postId, action)
            .then((response) => {
                toast.success(`Post ${action.toLowerCase()} successfully`);
                fetchInstaPosts(); // Refresh the list
            })
            .catch((error) => {
                console.error(`Error ${action.toLowerCase()}ing post:`, error);
                toast.error(`Failed to ${action.toLowerCase()} post`);
            })
            .finally(() => {
                setProcessing(prev => ({ ...prev, [postId]: false }));
            });



    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <div className="row">
                <div className="col-12">
                    <h2 className="mb-4">Review Instagram Posts</h2>

                    {instaPosts.length === 0 ? (
                        <div className="alert alert-info">No posts available for review</div>
                    ) : (
                        <div className="list-group">
                            {instaPosts.map((post) => (
                                <div key={post.instaPostId} className="list-group-item mb-3 rounded shadow-sm">
                                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                                        <div className="mb-2 mb-md-0">
                                            <h5 className="mb-1">{post.campaign.title}</h5>
                                            <div className="d-flex flex-wrap gap-2 small text-muted">
                                                <span>Posted by: {post.user.name}</span>
                                                <span>Date: {formatDate(post.date)}</span>
                                                <span>Cashback: ₹{post.cashback}</span>
                                                {post.postUrl && (
                                                    <a href={post.postUrl} target="_blank" rel="noopener noreferrer">
                                                        View Post
                                                    </a>
                                                )}
                                            </div>
                                            <div className="mt-1">
                                                <span className={`badge bg-${post.status === 'APPROVED' ? 'success' :
                                                    post.status === 'REJECTED' ? 'danger' : 'warning'}`}>
                                                    {post.status}
                                                </span>
                                            </div>
                                        </div>

                                        {post.status === 'PENDING' && (
                                            <div className="d-flex flex-column flex-md-row align-items-end gap-2">
                                                <select
                                                    className="form-select form-select-sm"
                                                    value={selectedAction[post.instaPostId] || 'PENDING'}
                                                    onChange={(e) => handleActionChange(post.instaPostId, e.target.value)}
                                                    disabled={processing[post.instaPostId]}
                                                >
                                                    <option value="PENDING" disabled>status</option>
                                                    <option value="APPROVED">Approve</option>
                                                    <option value="REJECTED">Reject</option>
                                                </select>
                                                <button
                                                    className="btn btn-sm btn-primary"
                                                    onClick={() => handleSubmitReview(post.instaPostId)}
                                                    disabled={processing[post.instaPostId] ||
                                                        selectedAction[post.instaPostId] === 'PENDING'}
                                                >
                                                    {processing[post.instaPostId] ? (
                                                        <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                                    ) : null}
                                                    Submit
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewPost;