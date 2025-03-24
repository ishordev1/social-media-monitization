import { privateAxios } from "./Helper";

//create
export const getCampaigns = (user) => {
    return privateAxios
        .post('/api/campaigns', user)
        .then((response) => response.data);
};
