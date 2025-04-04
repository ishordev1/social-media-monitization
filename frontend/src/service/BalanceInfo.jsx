import { privateAxios } from "./Helper";
// http://localhost:8080/api/balanceinfo/eec60d7d-2bc2-4f13-85b1-a1698a23ac2a
export const balanceInfo = (userId) => {
    return privateAxios
        .get(`/balanceinfo/${userId}`)
        .then((response) => response.data);
};