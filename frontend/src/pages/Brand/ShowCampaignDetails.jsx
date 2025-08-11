import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCampaignsById } from "../../service/CampaignService";
import { toast } from "react-toastify";

const ShowCampaignDetails = () => {
    const { campaignId } = useParams();
    const [campaignData, setCampaignData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                setLoading(true);
                const response = await getCampaignsById(campaignId);
                setCampaignData(response);
                console.log("Campaign Data:", response);
            } catch (err) {
                console.error("Error fetching campaign data:", err);
                toast.error("Failed to fetch campaign details.");
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaign();
    }, [campaignId]);

    if (loading) {
        return <div className="container my-4">Loading campaign details...</div>;
    }

    if (error) {
        return <div className="container my-4 text-danger">Error loading campaign details.</div>;
    }

    if (!campaignData) {
        return <div className="container my-4">No campaign data found.</div>;
    }
    const percentage = ((campaignData.distributeAmount / campaignData.amount) * 100).toFixed(1);
    return (
        <div className="container my-4">
            {/* Campaign Header */}
            <div className="card shadow-sm mb-4">
                {/* Only show image if available */}
                {campaignData.campaignImgName && (
                    <img
                        src={`/uploads/${campaignData.campaignImgName}`}
                        className="card-img-top"
                        alt="Campaign Banner"
                        style={{ maxHeight: "200px", objectFit: "cover" }}
                    />
                )}
                <div className="card-body">
                    <h3 className="card-title">{campaignData.title}</h3>
                    <div
                        className="form-control mb-3"
                        style={{ height: "100px", overflowY: "auto" }}
                        dangerouslySetInnerHTML={{ __html: campaignData.description }}
                    ></div>
                    <div className="row">
                        <div className="col">
                            <strong>Total Funds:</strong> ${campaignData.amount}
                        </div>
                        <div className="col">
                            <strong>Distributed:</strong> ${campaignData.distributeAmount}
                        </div>
                        <div className="col">
                            <strong>Remaining Amount:</strong> ${campaignData.remainingAmount}
                        </div>
                        <div className="col">
                            <strong>Created On:</strong>{" "}
                            {new Date(campaignData.createdDate).toLocaleDateString()}
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3 d-flex align-items-center">
                        <div className="flex-grow-1 me-3">
                            <div className="progress" style={{ height: "6px" }}>
                                <div
                                    className="progress-bar bg-primary"
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                            <small className="text-muted">{percentage}% distributed Amount</small>
                        </div>

                    </div>
               </div>
               </div>


                {/* Participants List */}
                <div className="card shadow-sm">
                    <div className="card-header d-flex justify-content-between">
                        <h5 className="mb-0">Participants</h5>
                        <h5 className="mb-0"> Total: {campaignData.posts?.length || 0}</h5>
                    </div>
                    <div className="card-body table-responsive p-0">
                        <table className="table table-striped mb-0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Joined On</th>
                                    <th>Reward</th>
                                    <th>Status</th>
                                    <th>Post Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {campaignData.posts?.length > 0 ? (
                                    campaignData.posts.map((post, index) => (
                                        <tr key={post.instaPostId}>
                                            <td>{index + 1}</td>
                                            <td>{post.user.name}</td>
                                            <td>{post.user.email}</td>
                                            <td>{new Date(post.user.joinDate).toLocaleDateString()}</td>
                                            <td>${post.cashback}</td>
                                            <td>
                                                <span
                                                    className={`badge ${post.status === "Approved"
                                                        ? "bg-success"
                                                        : post.status === "PENDING"
                                                            ? "bg-warning text-dark"
                                                            : "bg-secondary"
                                                        }`}
                                                >
                                                    {post.status}
                                                </span>
                                            </td>
                                            <td>
                                                <Link
                                                    to={post.postUrl}
                                                    target="_blank"
                                                    className="btn btn-primary btn-sm"
                                                >
                                                    Post link
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">
                                            No participants found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            );
};

            export default ShowCampaignDetails;
