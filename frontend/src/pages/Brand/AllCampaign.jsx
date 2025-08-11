
import { useEffect, useState } from 'react';
import { BrandCardCampaign } from '../../component/Brand/BrandCardCampaign'
import { getCurrentUserDetails } from '../../auth/Index';
import { getCampaignsByBrandId } from '../../service/CampaignService';

const AllCampaign = () => {
const [campaigns, setCampaigns] = useState([]);

useEffect(()=>{
const user=getCurrentUserDetails()
getCampaignsByBrandId(user.userId).then((data)=>{ 
  setCampaigns(data);
}).catch((error)=>{
  console.error("Error fetching campaigns:", error);
})},
[])
  
 const handleCampaignDeleted = (deletedId) => {
    setCampaigns((prev) => prev.filter(c => c.campaignId !== deletedId));
  };
  return (
    <div className="container mt-4">
      {/* {JSON.stringify(campaigns) } */}
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Dashboard</h3>
        <div className="d-flex">

          <button className="btn btn-primary me-2 d-flex align-items-center">
            <i className="fas fa-plus me-1"></i> Add
          </button>
          <input
            type="text"
            className="form-control"
            placeholder="Search"
          />
        </div>
      </div>

     {campaigns.length > 0 ? (
       campaigns.map((campaign) => (
         <BrandCardCampaign key={campaign.campaignId} 
         campaign={campaign} 
          onDeleted={handleCampaignDeleted}
         />
       ))
     ) : (
       <p>No campaigns found.</p>
     )}
      </div>
   
  )
}

export default AllCampaign