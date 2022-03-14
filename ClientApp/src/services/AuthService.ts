import {AxiosResponse} from "axios";
import $auth from "../http";
import {AuthResponse} from "../models/response/AuthResponse";

export default class AuthService {
    static async login(username: string, password: string): Promise<any> {
        return $auth.post<AuthResponse>('/login', {username, password})
    }

    static async registration(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $auth.post<AuthResponse>('/registration', {username, password})
    }

    static async logout(): Promise<AxiosResponse<AuthResponse>> {
        return $auth.post<AuthResponse>('/logout')
    }
}