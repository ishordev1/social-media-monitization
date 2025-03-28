import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getCampaigns } from '../../service/CampaignService';
import CampaignCard from '../../component/User/campaign/CampaignCard';

const Campaign = () => {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        getCampaigns()
            .then((response) => {
                setCampaigns(response);
                console.log("data" + response.data);
                // toast.success('Campaigns fetched successfully!');

            })
            .catch((error) => {
                toast.error('Error fetching campaigns: ' + error.message);
            });
    }, []);

    return (
        <div className="campaign-list-container   bg-Color p-2">
            <div className="campaign-list d-flex flex-wrap justify-content-center">
                {campaigns.length === 0 ? (
                    <div className="no-campaigns-message">
                        No campaigns found
                    </div>
                ) : (
                    campaigns.map((campaign) => (
                        <CampaignCard
                            key={campaign.campaignId}
                            campaign={campaign}
                            width="350px"
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Campaign;