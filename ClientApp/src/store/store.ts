import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";


export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;
    usersList = [] as any;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    async login(username: string, password: string) {
        const response = await AuthService.login(username, password)
        localStorage.setItem('token', response.data.accessToken);
        this.setAuth(true);
        this.setUser(response.data.user)
    }

    async registration(username: string, password: string) {
        try {
            const response = await AuthService.registration(username, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e)
        }
    }

    async checkAuth() {
        try {
            this.setLoading(true);
            const response = await axios.get<AuthResponse>(`http://localhost:5000/auth/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user)
            this.setLoading(false);
        } catch (e) {
            console.log(e);
        } finally {
            this.setLoading(false);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser)
        } catch (e) {
            console.log(e)
        }
    }

    async getAllUsers() {
        try {
            const response = await AuthService.getAllUsers();
            this.usersList = response.data;
        } catch(e) {

        }
    }
}