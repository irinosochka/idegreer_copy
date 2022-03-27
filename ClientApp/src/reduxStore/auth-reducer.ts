import {BaseThunkType, InferActionsTypes} from "./store";
import {IUser} from "../models/IUser";
import AuthService from "../services/AuthService";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {Dispatch} from "react";
import UserService from "../services/UserService";

export type InitialStateType = typeof INITIAL_STATE;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const INITIAL_STATE = {
    authUser: {} as IUser,
    isAuth: false,
    isLoading: false,

    /* Errors */
    loginError: false,
    registrationError: false,
    userDataChangedSuccess: false,
    userDataChangingError: false,
}

const authReducer = (state = INITIAL_STATE, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET_AUTH": {
            return {
                ...state,
                isAuth: action.payload
            }
        }
        case "SET_LOGIN_ERROR": {
            return {
                ...state,
                loginError: action.payload
            }
        }
        case "SET_REGISTRATION_ERROR": {
            return {
                ...state,
                registrationError: action.payload
            }
        }
        case "SET_AUTH_USER": {
            return {
                ...state,
                authUser: action.payload
            }
        }
        case "SET_LOADING": {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        case "SET_USER_DATA_CHANGING_ERROR": {
            return {
                ...state,
                userDataChangingError: action.payload
            }
        }
        case "SET_USER_DATA_CHANGING_SUCCESS": {
            return {
                ...state,
                userDataChangedSuccess: action.payload
            }
        }
        default:
            return state
    }
}

export const actions = {
    setAuth: (bool: boolean) => ({type: 'SET_AUTH', payload: bool} as const),
    setLoginError: (bool: boolean) => ({type: 'SET_LOGIN_ERROR', payload: bool} as const),
    setRegistrationError: (bool: boolean) => ({type: 'SET_REGISTRATION_ERROR', payload: bool} as const),
    setAuthUser: (user: IUser) => ({type: 'SET_AUTH_USER', payload: user} as const),
    setLoading: (bool: boolean) => ({type: 'SET_LOADING', payload: bool} as const),
    setUserDataChangingError: (bool: boolean) => ({type: "SET_USER_DATA_CHANGING_ERROR", payload: bool} as const),
    setUserDataChangingSuccess: (bool: boolean) => ({type: "SET_USER_DATA_CHANGING_SUCCESS", payload: bool} as const)
}

export const login = (username: string, password: string): ThunkType =>
    async (dispatch: Dispatch<any>) => {
        const response = await AuthService.login(username, password)
        if (response.data.resultCode === 1) {
            localStorage.setItem('token', response.data.data.accessToken);
            dispatch(actions.setAuth(true))
            dispatch(actions.setAuthUser(response.data.data.user))
        }
        if (response.data.resultCode === 0) {
            dispatch(actions.setLoginError(true))
        }
    }

export const registration = (username: string, password: string, name: string, email: string): ThunkType =>
    async (dispatch: Dispatch<any>) => {
        const response = await AuthService.registration(username, password, name, email);
        if (response.data.resultCode === 1) {
            localStorage.setItem('token', response.data.data.accessToken);
            dispatch(actions.setAuth(true))
            dispatch(actions.setAuthUser(response.data.data.user))
        }
        if (response.data.resultCode === 0) {
            dispatch(actions.setRegistrationError(true))
        }
    }

export const checkAuth = (): ThunkType =>
    async (dispatch: Dispatch<any>) => {
        try {
            dispatch(actions.setLoading(true));
            const response = await axios.get<AuthResponse>(`http://localhost:5000/auth/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            dispatch(actions.setAuth(true));
            dispatch(actions.setAuthUser(response.data.user))
            dispatch(actions.setLoading(false));
        } catch (e) {
            throw new Error('No auth')
        } finally {
            dispatch(actions.setLoading(false));
        }
    }

export const logout = (): ThunkType => {
    return async (dispatch: Dispatch<any>) => {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            dispatch(actions.setAuth(false));
            dispatch(actions.setAuthUser({} as IUser));
        } catch (e) {
            console.log(e)
        }
    }
}

export const userDataChanging = (formData: FormData): ThunkType =>
    async (dispatch: Dispatch<any>) => {
        const response = await UserService.userDataChanging(formData);
        if (response.data.resultCode === 1) {
            dispatch(actions.setAuthUser(response.data.data.user));
            dispatch(actions.setUserDataChangingSuccess(true))
            return response
        } else {
        }
    }

export default authReducer;
