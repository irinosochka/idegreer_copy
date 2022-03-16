import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import CourseService from "../services/CourseService";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import UserService from "../services/UserService";


export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;
    usersList = [] as any;
    courses = [] as any;

    /* Errors */
    loginError = false;
    registrationError = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setLoginError(bool: boolean) {
        this.loginError = bool
    }

    setRegistrationError(bool: boolean) {
        this.registrationError = bool
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    async login(username: string, password: string) {
        const response = await AuthService.login(username, password)
        if (response.data.resultCode === 1) {
            localStorage.setItem('token', response.data.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.data.user)
        }
        if (response.data.resultCode === 0) {
            this.setLoginError(true);
        }
    }

    async registration(username: string, password: string, name: string, email: string) {
        const response = await AuthService.registration(username, password, name, email);
        if (response.data.resultCode === 1) {
            localStorage.setItem('token', response.data.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.data.user)
        }
        if (response.data.resultCode === 0) {
            this.setRegistrationError(true)
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
        } catch (e) {

        }
    }

    async passwordChanging(lastPassword: string, newPassword: string) {
        try {
            return await UserService.passwordChanging(this.user.username, lastPassword, newPassword)
        } catch(e) {

        }
    }

    async userDataChanging(newUsername: string, newName: string, newEmail: string) {
        try {
            return await UserService.userDataChanging(this.user.username, newUsername, newName, newEmail)
        } catch(e) {

        }
    }

    async addCourse(title: string, theme: string, description: string) {
        try {
            return await CourseService.addCourse(this.user.username, title, theme, description)
        } catch(e) {
            
        }
    }

    async getAllCourses() {
        try {
            return await CourseService.getCourses()
        } catch(e) {

        }
    }
}