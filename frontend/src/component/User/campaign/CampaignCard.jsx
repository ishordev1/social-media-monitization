import React, { useEffect, useState } from 'react';
import './CampaignCard.css';
import { participateInCampaign } from '../../../service/CampaignService';
import { toast } from 'react-toastify';
import { getCurrentUserDetails } from '../../../auth/Index';

const CampaignCard = ({ campaign, width = '350px' }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [participationData, setParticipationData] = useState({
        postUrl: '',
        productUniqueCode: ''
    });
    const [user, setUser] = useState(null);
    useEffect(() => {
        const user = getCurrentUserDetails();
        setUser(user);
        
    }, [])

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const statusColors = {
        RUNNING: 'var(--running-color)',
        COMPLETED: 'var(--completed-color)',
        CANCELLED: 'var(--cancelled-color)'
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setParticipationData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await participateInCampaign(
                campaign.campaignId,
                user.userId,
                participationData
            );
            setSubmitSuccess(true);
            toast.success('Participation successful!');
            setParticipationData({
                postUrl: '',
                productUniqueCode: ''
            });
            // Close the modal after 2 seconds
            setTimeout(() => {
                setShowModal(false);
                setSubmitSuccess(false);
            }, 2000);
        } catch (error) {
            console.log(error);
            toast.error('Error: ' + error.response.data.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="campaign-card shadow m-2" style={{ width }}>
            {/* Card content remains the same until the participation section */}
            <div className="campaign-header bg-warning p-2 rounded display-flex">
                <img
                    src={'https://logo.clearbit.com/apple.com'}
                    alt={` logo`}
                    className="rounded-circle me-3 border border-white shadow-sm"
                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                />
                <h3 className="campaign-title">{campaign.title}</h3>
                <span
                    className="campaign-status"
                    style={{ backgroundColor: statusColors[campaign.status] || '#ccc' }}
                >
                    {campaign.status}
                </span>
            </div>

            <p className="campaign-description" dangerouslySetInnerHTML={{ __html: campaign.description.slice(0, 30) }}></p>

            <div className="campaign-meta">
                <div className="meta-item">
                    <span className="meta-label">Created by:</span>
                    <span className="meta-value">{campaign.user.name}</span>
                </div>
                <div className="meta-item">
                    <span className="meta-label">Created on:</span>
                    <span className="meta-value">{formatDate(campaign.createdDate)}</span>
                </div>
            </div>

            <div className="campaign-finance">
                <div className="finance-item">
                    <div className="finance-progress">
                        <div
                            className="progress-bar"
                            style={{
                                width: `${(campaign.distributeAmount / campaign.amount) * 100}%`
                            }}
                        ></div>
                    </div>
                    <div className="finance-numbers">
                        <span className="finance-amount">{formatCurrency(campaign.distributeAmount)}</span>
                        <span className="finance-total">of {formatCurrency(campaign.amount)}</span>
                    </div>
                </div>
                <div className="finance-remaining">
                    <span className="remaining-label">Remaining:</span>
                    <span className="remaining-amount">{formatCurrency(campaign.remainingAmount)}</span>
                </div>
            </div>

            {/* Button to trigger modal */}
            <button
                type="button"
                className="btn btn-primary w-100 mt-3"
                data-bs-toggle="modal"
                data-bs-target={`#campaignModal-${campaign.campaignId}`}
                onClick={() => setShowModal(true)}
            >
                Participate in Campaign
            </button>

            {/* Bootstrap Modal */}
            <div
                className="modal fade"
                id={`campaignModal-${campaign.campaignId}`}
                tabIndex="-1"
                aria-labelledby="campaignModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="campaignModalLabel">
                                Participate in {campaign.title}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => {
                                    setShowModal(false);
                                    setSubmitSuccess(false);
                                }}
                            ></button>
                        </div>
                        <div className="modal-body">
                            {submitSuccess ? (
                                <div className="alert alert-success">
                                    Thank you for participating!
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="postUrl" className="form-label">Submission URL</label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            id="postUrl"
                                            name="postUrl"
                                            placeholder="Enter your submission URL"
                                            value={participationData.postUrl}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="productUniqueCode" className="form-label">Product Unique Code</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="productUniqueCode"
                                            name="productUniqueCode"
                                            placeholder="Enter your Product Unique Code"
                                            value={participationData.productUniqueCode}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Submitting...
                                            </>
                                        ) : 'Submit'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignCard;