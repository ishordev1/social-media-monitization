// ReviewPost.jsx
import React, { useState, useEffect } from 'react';
import { getAllRequestInstaPost, postReview } from '../../../service/InstaPostService';
import { getCurrentUserDetails } from '../../../auth/Index';
import { toast } from 'react-toastify';
import ReviewSinglePost from './ReviewSinglePost';

const ReviewPost = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [instaPosts, setInstaPosts] = useState([]);
    const [loading, setLoading] = useState(true);

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
            })
            .catch((error) => {
                console.error("Error fetching Insta Posts:", error);
                toast.error("Failed to load posts");
            })
            .finally(() => {
                setLoading(false);
            });
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
                                <ReviewSinglePost
                                    key={post.instaPostId}
                                    campaignId={post.campaignId}
                                    post={post}
                                    currentUser={currentUser}
                                    onReviewSubmit={fetchInstaPosts}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewPost;
