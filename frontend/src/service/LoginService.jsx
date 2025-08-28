import { myAxios } from "./Helper"

export const signUp = (user) => {
    //signup function call kate bakt return then me data response ka data aaye ga
    return myAxios
        .post('/auth/signup', user)
        .then((response) => response.data)
}

export const login = (loginDetail) => {
    return myAxios
        .post('/auth/signin', loginDetail)
        .then((response) => response.data)
}


export const uploadProfileImage = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return myAxios
        .post("/auth/profileupload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => response.data); // backend se URL return hoga
};

