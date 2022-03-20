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
    passwordChangingError = false;
    userDataChangingError = false;
    getAllCourseError = false;
    addCourseError = false;
    roleExistInThisUser = false;

    /* Success */
    passwordChangingSuccess = false;
    roleAdded = false;
    roleRemoved = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setRoleRemoved(bool: boolean) {
        this.roleRemoved = bool
    }

    setRoleAdded(bool: boolean) {
        this.roleAdded = bool
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

    setUserList(users: any) {
        this.usersList = users
    }

    setUserDataChangingError(bool: boolean) {
        this.userDataChangingError = bool
    }


    setPasswordChangingError(bool: boolean) {
        this.passwordChangingError = bool;
    }

    setRoleExistInThisUser(bool: boolean) {
        this.roleExistInThisUser = bool
    }

    setGetAllCourseError(bool: boolean) {
        this.getAllCourseError = bool
    }

    setCourses(courses: any) {
        this.courses = courses
    }

    setAddCourseError(bool: boolean) {
        this.addCourseError = bool
    }

    addNewCourse(course: any) {
        this.courses = [...this.courses, course]
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
            throw new Error('No auth')
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
            this.setUserList(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    async passwordChanging(lastPassword: string, newPassword: string) {
        try {
            const response = await UserService.passwordChanging(this.user.username, lastPassword, newPassword);
            if (response.data.resultCode === 1) {
                this.passwordChangingSuccess = true
                return response
            }
            if (response.data.resultCode === 0) {
                this.setPasswordChangingError(true);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async userDataChanging(newUsername: string, newName: string, newEmail: string) {
        try {
            const response = await UserService.userDataChanging(this.user.username, newUsername, newName, newEmail);
            if (response.data.resultCode === 1) {
                this.setUser(response.data.data.user);
                return response
            }
            if (response.data.resultCode === 0) {
                this.setUserDataChangingError(true)
            }
        } catch (e) {
            console.log(e);
        }
    }

    async addCourse(title: string, theme: string, description: string) {
        try {
            const response = await CourseService.addCourse(this.user.username, title, theme, description);
            if (response.data.resultCode === 1) {
                this.addNewCourse(response.data.data)
            }
            if (response.data.resultCode === 0) {
                this.setAddCourseError(true)
            }
        } catch (e) {
            console.log(e);
        }
    }

    async getAllCourses() {
        try {
            const response = await CourseService.getCourses();
            if (response.data.resultCode === 0) {
                this.setGetAllCourseError(true)
            }
            if (response.data.resultCode === 1) {
                this.setCourses(response.data.data);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async removeRoleFromUser(roleToRemove: string) {
        try {
            const response = await UserService.removeRoleFromUser(this.user.username, roleToRemove);
            if (response.data.resultCode === 1) {
                this.setRoleRemoved(true)
            } else {
                console.log('no this role on this user')
            }
        } catch (e) {
            console.log(e)
        }
    }

    async setRoleToUser(newRole: string) {
        try {
            if (!this.user.roles.includes(newRole)) {
                const response = await UserService.setRoleToUser(this.user.username, newRole);
                if (response.data.resultCode === 1) {
                    this.setRoleAdded(true)
                } else {
                    console.log('Role was not added')
                }
            } else {
                this.setRoleExistInThisUser(true);
            }
        } catch (e) {
            console.log(e);
        }
    }
}
