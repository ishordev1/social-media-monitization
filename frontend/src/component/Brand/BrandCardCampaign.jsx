import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DeleteCampaigns, updatingCampaign, uploadCampaignImage } from "../../service/CampaignService";
import { getCurrentUserDetails } from "../../auth/Index";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";

export const BrandCardCampaign = ({ campaign, onDeleted, updateCampaign }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const editor = useRef(null);

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "" // URL of existing or new image
  });

  const [imageFile, setImageFile] = useState(null); // New file to upload
  const [previewImage, setPreviewImage] = useState(""); // Preview in modal

  useEffect(() => {
    setCurrentUser(getCurrentUserDetails());
    // Initialize form with existing campaign data
    if (campaign) {
      setFormData({
        title: campaign.title,
        description: campaign.description,
        imageUrl: campaign.image // existing image URL
      });
      setPreviewImage(campaign.image);
    }
  }, [campaign]);

  const percentage = ((campaign.distributeAmount / campaign.amount) * 100).toFixed(1);
  const remaining = campaign.amount - campaign.distributeAmount;

  // Handle delete
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      try {
        await DeleteCampaigns(currentUser.userId, campaign.campaignId);
        toast.success("Campaign deleted successfully!");
        if (onDeleted) onDeleted(campaign.campaignId);
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete campaign.");
      }
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Update preview immediately
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle update campaign
  const handleUpdate = async () => {
    try {
      let updatedImageUrl = formData.imageUrl;

      // 1️⃣ Upload new image first if selected
      if (imageFile) {
        updatedImageUrl = await uploadCampaignImage(imageFile);
      }

      // 2️⃣ Prepare updated campaign data
      const updatedCampaign = {
        ...campaign,
        title: formData.title,
        description: formData.description,
        image: updatedImageUrl
      };

      // 3️⃣ Call manual update method with campaignId
      await updatingCampaign(campaign.campaignId, updatedCampaign);

      toast.success("Campaign updated successfully!");
      setShowModal(false);

    } catch (error) {
      console.error(error);
      toast.error("Failed to update campaign.");
    }
  };

  return (
    <div className="container mt-4">
      <div
        className="card border mb-3 shadow-sm border-0 p-3 campaign-cards w-100"
        style={{
          borderRadius: "12px",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h6 className="fw-bold">{campaign.title}</h6>
            <small className="text-muted">
              Created: {new Date(campaign.createdDate).toLocaleDateString()}
            </small>
          </div>
          <span
            className={`badge ${campaign.status === "RUNNING" ? "bg-success" : "bg-secondary"
              }`}
          >
            {campaign.status}
          </span>
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
            <small className="text-muted">{percentage}% distributed</small>
          </div>

          {/* Action Buttons */}
          <div className="d-flex">
            <Link to={`/brand/home/campaign/view/${campaign.campaignId}`}
              className="btn btn-outline-secondary btn-sm me-2"
            >
              <i className="fas fa-eye"></i> View
            </Link>

            <button
              className="btn btn-outline-primary btn-sm me-2"
              onClick={() => setShowModal(true)}
            >
              <i className="fas fa-edit"></i> Edit
            </button>

            <button
              className="btn btn-danger btn-sm"
              onClick={handleDelete}
            >
              <i className="fas fa-trash"></i> Delete
            </button>
          </div>
        </div>

        {/* Fund Info */}
        <div className="row mt-3">
          <div className="col">
            <small>Total Funds</small>
            <p className="mb-0 fw-bold">${campaign.amount.toLocaleString()}</p>
          </div>
          <div className="col">
            <small>Distributed</small>
            <p className="mb-0 fw-bold text-success">
              ${campaign.distributeAmount.toLocaleString()}
            </p>
          </div>
          <div className="col">
            <small>Remaining</small>
            <p className="mb-0 fw-bold text-danger">
              ${remaining.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <style>
        {`
          .campaign-cards:hover {
            transform: translateY(-5px) scale(1.01);
            box-shadow: 0px 8px 20px rgba(0,0,0,0.15);
          }
        `}
      </style>

      {/* Edit Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog" style={{ maxWidth: "70%" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Campaign</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <JoditEditor
                      ref={editor}
                      value={formData.description}
                      onBlur={(newContent) => setFormData(prev => ({ ...prev, description: newContent }))}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Image</label>
                    {previewImage && (
                      <div className="mb-2 text-center">
                        <img
                          src={previewImage}
                          alt="Preview"
                          style={{ maxHeight: "150px" }}
                          className="img-fluid rounded mb-2"
                        />
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger mb-2"
                          onClick={() => {
                            setPreviewImage(null);
                            setImageFile(null);
                            setFormData(prev => ({ ...prev, imageUrl: "" }));
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleImageChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                <button className="btn btn-primary" onClick={handleUpdate}>Update Campaign</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
