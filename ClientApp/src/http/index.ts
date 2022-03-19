import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";

const baseAuthURL = `http://localhost:5000/auth`
const baseUserURL = `http://localhost:5000/user`
const baseCourseURL = `http://localhost:5000/course`

export const $auth = axios.create({
    withCredentials: true,
    baseURL:  baseAuthURL
})

export const $user = axios.create({
    withCredentials: true,
    baseURL: baseUserURL
})

export const $course = axios.create({
    withCredentials: true,
    baseURL: baseCourseURL
})

$auth.interceptors.request.use((config) => {
    config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config
})

$auth.interceptors.response.use((config) => {
    return config;
},  (async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
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