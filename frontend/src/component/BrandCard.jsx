import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCampaignsByBrandId } from '../service/CampaignService';
import { toast } from 'react-toastify';
const BrandCard = ({ brand }) => {
    const navigate = useNavigate();
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
            getCampaignsByBrandId(brand.userId)
                .then((response) => {
                    setCampaigns(response);
                    // console.log("data" + response.data);
                    // toast.success('Campaigns fetched successfully!');
    
                })
                .catch((error) => {
                    toast.error('Error fetching campaigns: ' + error.message);
                });
        }, []);

    const handleClick = () => {
        navigate(`/customer/brand/${brand.userId}`);
    };
console.log(campaigns);

    return (
        <div
            className="card mb-4 shadow-sm cursor-pointer m-3"
            style={{ width: '18rem' }}
        >
            {/* Image Section */}
            <div className="position-relative" style={{ height: '200px', overflow: 'hidden' }}>
                <img
                    src={'https://1000logos.net/wp-content/uploads/2022/10/Lenskart-Logo.png'}
                    className=" card-img-top  object-fit-cover"
                    alt={brand.name}
                    style={{ objectFit: 'cover' }}
                />
                <div className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                    }}
                ></div>

            </div>

            {/* Card Body */}
            <div className="card-body">
                <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0">{brand.name}</h5>

                    <span className="text-muted ms-auto ">
                        <i className="fas fa-users me-1"></i>
                        {brand.email || 'brand@gmail.com'} 
                    </span>
                </div>


            </div>

            {/* Footer */}
            <div className="card-footer bg-light d-flex justify-content-between align-items-center">
                <span className="text-muted small">
                    <i className="fas fa-users me-1"></i>
                    {campaigns.length || '120'} Campaign
                </span>
                <button
                    className="btn btn-link btn-sm text-primary p-0"
                    onClick={handleClick}
                >
                    Quick Apply <i className="fas fa-arrow-right ms-1"></i>
                </button>
            </div>
        </div>
    );
};

export default BrandCard;
