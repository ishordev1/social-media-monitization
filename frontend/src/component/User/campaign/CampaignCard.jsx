import React, { useState } from 'react';
import './CampaignCard.css';
import { participateInCampaign } from '../../../service/CampaignService';
import { toast } from 'react-toastify';

const CampaignCard = ({ campaign, width = '350px' }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [participationData, setParticipationData] = useState({
        postUrl: '',
        productUniqueCode: ''
    });

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
                campaign.user.userId,
                participationData
            );
            setSubmitSuccess(true);
            toast.success('Participation successful!');
            setParticipationData({
                postUrl: '',
                productUniqueCode: ''
            });
        } catch (error) {
            toast.error('Error participating in campaign: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="campaign-card shadow m-2" style={{ width }}>
            {/* Existing card content remains the same */}
            <div className="campaign-header bg-warning p-2 rounded">
                <h3 className="campaign-title">{campaign.title}</h3>
                <span
                    className="campaign-status"
                    style={{ backgroundColor: statusColors[campaign.status] || '#ccc' }}
                >
                    {campaign.status}
                </span>
            </div>

            {/* Only showing 30 words of the description */}
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

            <div className="participation-form mt-4 p-2 border-top bg-primary text-white rounded">
                <b className="form-title">Participate in this campaign</b>
                {submitSuccess ? (
                    <div className="alert alert-success">
                        Thank you for participating!
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="url"
                                name="postUrl"
                                className="form-control"
                                placeholder="Enter your submission URL"
                                value={participationData.postUrl}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group my-2">
                            <input
                                type="text"
                                name="productUniqueCode"
                                className="form-control"
                                placeholder="Enter your Product Unique Code"
                                value={participationData.productUniqueCode}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-warning text-white w-100 mt-2"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CampaignCard;
