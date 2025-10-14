import axios from "axios";
import { getToken } from "../auth/Index";
import { toast } from "react-toastify";


export const BASE_URL = 'https://social-media-monitization.onrender.com';
// const BASE_URL = process.env.FRONTEND_URL || http://localhost:8080;
export const PRIVATE_URL = `${BASE_URL}/api`;

export const myAxios = axios.create({
    baseURL: BASE_URL,
})

export const privateAxios = axios.create({
    baseURL: PRIVATE_URL,
})

privateAxios.interceptors.request.use(
    config => {
        const token = getToken();


        // console.log(token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    }, error => Promise.reject(error))


    privateAxios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            const errorMessage = error.response?.data?.message || "Unauthorized access";
            toast.error(errorMessage); 
            localStorage.removeItem("data");
            window.location.href = "/signin";
        }
        return Promise.reject(error); }
);
