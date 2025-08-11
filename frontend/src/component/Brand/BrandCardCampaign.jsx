import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DeleteCampaigns } from "../../service/CampaignService";
import { getCurrentUserDetails } from "../../auth/Index";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";


export const BrandCardCampaign = ({ campaign, onDeleted }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const editor = useRef(null);
  useEffect(() => {
    setCurrentUser(getCurrentUserDetails());
  }, [campaign]);

  const percentage = ((campaign.distributeAmount / campaign.amount) * 100).toFixed(1);
  const remaining = campaign.amount - campaign.distributeAmount;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      try {
        await DeleteCampaigns(currentUser.userId, campaign.campaignId);
        toast.success("Campaign deleted successfully!");
        if (onDeleted) onDeleted(campaign.campaignId); // 👈 instantly remove from UI
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete campaign.");
      }
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
        <div
          className="modal fade show"
          style={{ display: "block"}}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document" style={{ maxWidth: "70%" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Campaign</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {/* Example form */}
                <form>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      defaultValue={campaign.title}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <div className="jodit-editor-container">
                      <JoditEditor
                        ref={editor}
                        value={campaign.description}
                      />
                    </div>

                  </div>


                  <div className="mb-3">
                    <label className="form-label">image</label>
                    <input
                      type="file"
                      className="form-control"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
