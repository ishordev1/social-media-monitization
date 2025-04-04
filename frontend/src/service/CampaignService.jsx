import { privateAxios } from "./Helper";

//create
export const getCampaigns = () => {
    return privateAxios
        .get('/campaigns')
        .then((response) => response.data);
};

//create// http://localhost:8080/api/instapost/campaign/dd8448a0-8e2a-4229-b30b-5997cc83fb23/participate/user/8f307518-a8c5-4fb5-86b4-9eaf07b26957

export const participateInCampaign = (campaignId, userId, data) => {
    return privateAxios
        .post(`/instapost/campaign/${campaignId}/participate/user/${userId}`, data)
        .then((response) => response.data);
};

// http://localhost:8080/api/campaigns/eec60d7d-2bc2-4f13-85b1-a1698a23ac2a
export const createCampaign = (userId, campaignData) => {
    return privateAxios
        .post(`/campaigns/${userId}`, campaignData)
        .then((response) => response.data);
};
