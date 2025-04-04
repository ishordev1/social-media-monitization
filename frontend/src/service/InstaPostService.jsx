// http://localhost:8080/api/admin/b91d0ae0-a915-46f4-af1a-8be1c0857b86/accept/post/9547ff83-0353-4445-b7f7-5367d707fff4/type/APPROVED

import { privateAxios } from "./Helper";

export const postReview = (adminId, postId, type) => {
    return privateAxios
        .post(`/admin/${adminId}/accept/post/${postId}/type/${type}`)
        .then((response) => response.data);
};

// http://localhost:8080/api/instapost
export const getAllRequestInstaPost = () => {
    return privateAxios
        .get(`/instapost`)
        .then((response) => response.data);
};