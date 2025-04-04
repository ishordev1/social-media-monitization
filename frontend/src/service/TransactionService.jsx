// http://localhost:8080/api/transaction/c1719fd0-1981-4a83-9724-877943c9a532

import { privateAxios } from "./Helper";

export const getAllTransaction = () => {
    return privateAxios
        .get(`/transaction`)
        .then((response) => response.data);
};

export const getTransactionByUserId = (userId) => {
    return privateAxios
        .get(`/transaction/${userId}`)
        .then((response) => response.data);
};
// http://localhost:8080/api/transaction/credit/eec60d7d-2bc2-4f13-85b1-a1698a23ac2a

export const creditMoney = (userId, data) => {
    return privateAxios
        .post(`/transaction/credit/${userId}`, data)
        .then((response) => response.data);
};
