import React from 'react';
import './CampaignCard.css';

const CampaignCard = ({ campaign }) => {
    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    // Format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Status color mapping
    const statusColors = {
        RUNNING: 'var(--running-color)',
        COMPLETED: 'var(--completed-color)',
        CANCELLED: 'var(--cancelled-color)'
    };

    return (
        <div className="campaign-card">
            <div className="campaign-header">
                <h3 className="campaign-title">{campaign.title}</h3>
                <span
                    className="campaign-status"
                    style={{ backgroundColor: statusColors[campaign.status] || '#ccc' }}
                >
                    {campaign.status}
                </span>
            </div>

            <p className="campaign-description">{campaign.description}</p>

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
        </div>
    );
};

export default CampaignCard;