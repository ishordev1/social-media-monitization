// ReviewSinglePost.jsx
import React, { useEffect, useState } from 'react';
import { postReview } from '../../../service/InstaPostService';
import { toast } from 'react-toastify';
import { getCampaignsById } from '../../../service/CampaignService';

const ReviewSinglePost = ({campaignId, post, currentUser, onReviewSubmit }) => {
    const [campaign, setCampaign] = useState(null);
    useEffect(()=>{
        getCampaignsById(campaignId)
            .then((data) => {
                setCampaign(data);
            })
            .catch((error) => {
                console.error("Error fetching campaign:", error);
                toast.error("Failed to load campaign");
            });
    },[]);
// console.log("data" + JSON.stringify(campaign));

    const [selectedAction, setSelectedAction] = useState('PENDING');
    const [processing, setProcessing] = useState(false);

    const handleActionChange = (value) => {
        setSelectedAction(value);
    };

    const handleSubmitReview = () => {
        if (!currentUser?.userId) {
            toast.error("User not authenticated");
            return;
        }

        if (!selectedAction || selectedAction === 'PENDING') {
            toast.warning("Please select an action");
            return;
        }

        setProcessing(true);

        postReview(currentUser.userId, post.instaPostId, selectedAction)
            .then(() => {
                toast.success(`Post ${selectedAction.toLowerCase()} successfully`);
                onReviewSubmit(); // Refresh the post list in parent
            })
            .catch((error) => {
                console.error(`Error ${selectedAction.toLowerCase()}ing post:`, error);
                toast.error(`Failed to ${selectedAction.toLowerCase()} post`);
            })
            .finally(() => {
                setProcessing(false);
            });
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="list-group-item mb-3 rounded shadow-sm">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                <div className="mb-2 mb-md-0">
                    <h5 className="mb-1">{campaign?.title}</h5>
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
                            value={selectedAction}
                            onChange={(e) => handleActionChange(e.target.value)}
                            disabled={processing}
                        >
                            <option value="PENDING" disabled>status</option>
                            <option value="APPROVED">Approve</option>
                            <option value="REJECTED">Reject</option>
                        </select>
                        <button
                            className="btn btn-sm btn-primary"
                            onClick={handleSubmitReview}
                            disabled={processing || selectedAction === 'PENDING'}
                        >
                            {processing ? (
                                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                            ) : null}
                            Submit
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewSinglePost;
