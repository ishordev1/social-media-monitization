import { privateAxios } from "./Helper";

export const getCampaigns = () => {
    return privateAxios
        .get('/campaigns')
        .then((response) => response.data);
};

//create

export const participateInCampaign = (campaignId, userId, data) => {
    return privateAxios
        .post(`/instapost/campaign/${campaignId}/participate/user/${userId}`, data)
        .then((response) => response.data);
};

export const createCampaign = (userId, campaignData) => {
    // console.log(campaignData);

    return privateAxios
        .post(`/campaigns/${userId}`, campaignData)
        .then((response) => response.data);
};
export const getCampaignsByBrandId = (id) => {
    return privateAxios
        .get('/campaigns/user/' + id)
        .then((response) => response.data);
};

export const getCampaignsById = (id) => {
    return privateAxios
        .get('/campaigns/' + id)
        .then((response) => response.data);
};
export const DeleteCampaigns = (userId, campaignId) => {
    return privateAxios
        .delete('/campaigns/' + userId + '/' + campaignId)
        .then((response) => response.data);
};





export const uploadCampaignImage = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return privateAxios
        .post("/campaigns/image-upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => response.data); // backend se URL return hoga
};

export const updateCampaignImage = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return privateAxios
        .put("/campaigns/update-image", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => response.data); // backend se URL return hoga
};



export const updatingCampaign = (campaignId, updateCampaignData) => {
    return privateAxios
        .put('/campaigns/' + campaignId, updateCampaignData)
        .then((response) => response.data);
};