import { privateAxios } from "../service/Helper";

//create
export const saveUser = (user) => {
    return privateAxios
        .post('/users', user)
        .then((response) => response.data);
};
export const updateUser=(userId,updatedUser)=>{
    return privateAxios.put('/users/'+userId,updatedUser)
    .then((response)=>response.data);
}

//getById
export const getUserById = (userId) => {
    return privateAxios
        .post('/users/' + userId)
        .then((response) => response.data);
};
//http://localhost:8080/api/users/role/brand
export const getUserByRoleAndStatus = (role,status) => {
    return privateAxios
        .get(`/users/role/${role}?status=${status}`)
        .then((response) => response.data);
};

export const searchUserByRoleAndName = (role,name) => {
    return privateAxios
        .get(`/users/search/role/${role}?name=${name}`)
        .then((response) => response.data);
};
// /api/search/users/role/customer"

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



export const uploadProfileImage = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return privateAxios
        .post("/users/profileupload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => response.data); // backend se URL return hoga
};