import { privateAxios } from "../service/Helper";

//create
export const saveUser = (user) => {
    return privateAxios
        .post('/users', user)
        .then((response) => response.data);
};

//getById
export const getUserById = (userId) => {
    return privateAxios
        .post('/users/' + userId)
        .then((response) => response.data);
};
//http://localhost:8080/api/users/role/brand
export const getUserByRole = (role) => {
    return privateAxios
        .get('/users/role/' + role)
        .then((response) => response.data);
};
//get All
export const getAllUser = () => {
    return privateAxios
        .get('/users')
        .then((response) => response.data);
};


export const getUserScore = (instaUserName) => {
    return privateAxios
        .get(`/users/insta/${instaUserName}`)
        .then((response) => response.data);
};



