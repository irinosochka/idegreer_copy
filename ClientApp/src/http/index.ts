import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";

const baseURL = `http://localhost:5000/auth`

const $auth = axios.create({
    withCredentials: true,
    baseURL:  baseURL
})

$auth.interceptors.request.use((config) => {
    config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config
})

$auth.interceptors.response.use((config) => {
    return config;
},  (async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`http://localhost:5000/auth/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken)
            return $auth.request(originalRequest)
        } catch(e) {
            console.log("Don't authorized");
        }
    }
}))

export default $auth