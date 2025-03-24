import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getCampaigns } from '../../service/CampaignService';
import CampaignCard from '../../component/User/campaign/CampaignCard';

const Campaign = () => {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const data = await getCampaigns(); // No parameters passed
                setCampaigns(data);
                toast.success('Campaigns loaded successfully!');
            } catch (err) {
                console.error('Error fetching campaigns:', err);
                toast.error(err.message || 'Failed to fetch campaigns');
            }
        };

        fetchCampaigns();
    }, []); // Empty dependency array means it runs once on mount

    return (
        <div className="campaign-list-container">
            <div className="campaign-list">
                {campaigns.length === 0 ? (
                    <div className="no-campaigns-message">
                        No campaigns found
                    </div>
                ) : (
                    campaigns.map((campaign) => (
                        <CampaignCard
                            key={campaign.campaignId}
                            campaign={campaign}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Campaign;