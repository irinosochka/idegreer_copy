import {AxiosResponse} from "axios";
import $auth from "../http";
import {AuthResponse} from "../models/response/AuthResponse";

export default class AuthService {
    static login(username: string, password: string): Promise<any> {
        return $auth.post<AuthResponse>('/login', {username, password}).then(res => {
            return res
        }).catch(e => console.log(e))
    }

    static registration(username: string, password: string, name: string, email: string): Promise<any> {
        return $auth.post<AuthResponse>('/registration', {username, password, name, email}).then(res => {
            return res
        }).catch(e => console.log(e))
    }

    static async logout(): Promise<AxiosResponse<AuthResponse>> {
        return $auth.post<AuthResponse>('/logout')
    }

    static async getAllUsers(): Promise<AxiosResponse<AuthResponse>> {
        return $auth.get<AuthResponse>('/users')
    }

}