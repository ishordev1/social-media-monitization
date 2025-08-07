import React, { useState, useEffect, useRef } from 'react';
import { createCampaign } from '../../../service/CampaignService';
import { getCurrentUserDetails } from '../../../auth/Index';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';
import "./BrandCampaign.css";
import { balanceInfo } from '../../../service/BalanceInfo';

const BrandCampaign = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [balanceInfoData, setBalanceInfoData] = useState({
        totalBalance: 0,
        spendBalance: 0
    });

    const editor = useRef(null);
    const [campaignData, setCampaignData] = useState({
        title: "",
        amount: "",
        description: "",
        image: null
    });

    useEffect(() => {
        const user = getCurrentUserDetails();
        setCurrentUser(user);
        if (user) {
            balanceInfo(user.userId)
                .then((response) => {
                    setBalanceInfoData({
                        totalBalance: response.totalBalance,
                        spendBalance: response.spendBalance
                    });
                })
                .catch((error) => {
                    console.error(error);
                    setError("Balance Rs: 0.00");
                });
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCampaignData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCampaignData(prev => ({
                ...prev,
                image: file
            }));

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!currentUser?.userId) {
            setError("User not authenticated");
            setLoading(false);
            return;
        }

        // Basic validation
        if (!campaignData.title || !campaignData.amount || !campaignData.description) {
            setError("Please fill all required fields");
            setLoading(false);
            return;
        }

        try {
            // Create FormData for file upload


            console.log("Campaign Data:", campaignData);


            const response = await createCampaign(currentUser.userId, campaignData);
            toast.success("Campaign created successfully!");

            // Reset form
            setCampaignData({
                title: "",
                amount: "",
                description: "",
                image: null
            });
            setPreviewImage(null);

        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Failed to create campaign");
            toast.error("Failed to create campaign");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: '#58d68d' }}>
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm overflow-hidden">
                            {/* Gradient Header */}
                            <div className="card-header bg-gradient-primary text-white py-3">
                                <div className="d-flex align-items-center">
                                    <div className="me-3">
                                        <i className="bi bi-megaphone fs-4"></i>
                                    </div>
                                    <div>
                                        <h2 className="h5 mb-0">Create New Campaign</h2>
                                        <p className="mb-0 opacity-75 small">Launch your marketing campaign</p>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body p-4">
                                {/* Balance Information */}
                                <div className="alert alert-info py-2 mb-4 d-flex justify-content-between align-items-center">
                                    <div>
                                        <i className="bi bi-wallet2 me-2"></i>
                                        <span className="small">Available Balance:</span>
                                    </div>
                                    <div>
                                        <span className="fw-bold">₹{balanceInfoData.totalBalance.toLocaleString()}</span>
                                        <span className="text-muted small ms-2">(Spent: ₹{balanceInfoData.spendBalance.toLocaleString()})</span>
                                    </div>
                                </div>

                                {error && (
                                    <div className="alert alert-danger d-flex align-items-center py-2 small" role="alert">
                                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                        <div>{error}</div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label fw-bold small text-muted">
                                            Campaign Title <span className="text-danger">*</span>
                                        </label>
                                        <div className="input-group input-group-sm">
                                            <span className="input-group-text bg-light">
                                                <i className="bi bi-pencil-square text-primary small"></i>
                                            </span>
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                value={campaignData.title}
                                                onChange={handleInputChange}
                                                className="form-control form-control-sm"
                                                placeholder="e.g. Summer Sale 2023"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="amount" className="form-label fw-bold small text-muted">
                                            Budget (₹) <span className="text-danger">*</span>
                                        </label>
                                        <div className="input-group input-group-sm">
                                            <span className="input-group-text bg-light">
                                                <i className="bi bi-currency-rupee text-primary small"></i>
                                            </span>
                                            <input
                                                type="number"
                                                id="amount"
                                                name="amount"
                                                value={campaignData.amount}
                                                onChange={handleInputChange}
                                                className="form-control form-control-sm"
                                                placeholder="Enter your budget"
                                                required
                                            />
                                        </div>
                                        <div className="form-text small">Available: ₹{(balanceInfoData.totalBalance).toLocaleString()}</div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-bold small text-muted">
                                            Description <span className="text-danger">*</span>
                                        </label>
                                        <div className="jodit-editor-container">
                                            <JoditEditor
                                                ref={editor}
                                                value={campaignData.description}
                                                config={{
                                                    readonly: false,
                                                    placeholder: 'Describe your campaign goals, target audience, etc.',
                                                    buttons: [
                                                        'bold', 'italic', 'underline', 'strikethrough', '|',
                                                        'ul', 'ol', '|',
                                                        'font', 'fontsize', 'brush', 'paragraph', '|',
                                                        'align', 'outdent', 'indent', '|',
                                                        'image', 'table', 'link', '|',
                                                        'undo', 'redo', '|',
                                                        'hr', 'eraser', 'fullsize'
                                                    ],
                                                    height: 300,
                                                    style: {
                                                        fontFamily: 'inherit',
                                                        fontSize: '14px'
                                                    },
                                                    disablePlugins: ['paste', 'stat']
                                                }}
                                                onBlur={(newContent) => {
                                                    setCampaignData(prev => ({
                                                        ...prev,
                                                        description: newContent
                                                    }));
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-bold small text-muted">
                                            Campaign Image
                                        </label>
                                        <div className="border rounded-2 p-2 text-center">
                                            {previewImage ? (
                                                <div className="mb-2">
                                                    <img
                                                        src={previewImage}
                                                        alt="Preview"
                                                        className="img-fluid rounded-2 mb-2 shadow-sm"
                                                        style={{ maxHeight: '150px' }}
                                                    />
                                                    <div className="d-flex justify-content-center">
                                                        <label className="btn btn-outline-primary btn-sm me-2">
                                                            Change
                                                            <input
                                                                type="file"
                                                                className="d-none"
                                                                accept="image/*"
                                                                onChange={handleImageChange}
                                                            />
                                                        </label>
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-danger btn-sm"
                                                            onClick={() => {
                                                                setPreviewImage(null);
                                                                setCampaignData(prev => ({ ...prev, image: null }));
                                                            }}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="file-upload-wrapper">
                                                    <label className="d-flex flex-column align-items-center justify-content-center p-3 border-dashed rounded-2 bg-light cursor-pointer">
                                                        <i className="bi bi-cloud-arrow-up text-muted mb-1"></i>
                                                        <span className="text-muted small mb-1">Drag & drop image</span>
                                                        <span className="text-muted small mb-2">or</span>
                                                        <span className="btn btn-primary btn-sm px-3">
                                                            Browse
                                                        </span>
                                                        <input
                                                            type="file"
                                                            className="d-none"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                        />
                                                    </label>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="d-grid mt-4">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-sm py-2 fw-bold"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Creating...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-rocket me-2"></i>
                                                    Launch Campaign
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandCampaign;