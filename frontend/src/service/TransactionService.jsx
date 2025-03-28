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

