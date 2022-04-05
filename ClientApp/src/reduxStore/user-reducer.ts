import {BaseThunkType, InferActionsTypes} from "./store";
import {IUser} from "../models/IUser";
import AuthService from "../services/AuthService";
import {Dispatch} from "react";
import UserService from "../services/UserService";

export type InitialStateType = typeof INITIAL_STATE;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const INITIAL_STATE = {
    user: {} as IUser,
    usersList: [] as any,
    passwordChangingError: false,
    passwordChangingSuccess: false
}

const userReducer = (state = INITIAL_STATE, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET_USER": {
            return {
                ...state,
                user: action.payload
            }
        }
        case "SET_USER_LIST": {
            return {
                ...state,
                usersList: action.payload
            }
        }
        case "SET_PASSWORD_CHANGING_ERROR": {
            return {
                ...state,
                passwordChangingError: action.payload
            }
        }
        case "SET_PASSWORD_CHANGING_SUCCESS": {
            return {
                ...state,
                passwordChangingSuccess: action.payload
            }
        }
        default:
            return state
    }
}

export const actions = {
    setUserDataChangingSuccess: (bool: boolean) => ({type: "SET_USER_DATA_CHANGING_SUCCESS", payload: bool} as const),
    setUser: (user: IUser) => ({type: "SET_USER", payload: user} as const),
    setUserList: (users: any) => ({type: "SET_USER_LIST", payload: users} as const),
    setPasswordChangingError: (bool: boolean) => ({type: "SET_PASSWORD_CHANGING_ERROR", payload: bool} as const),
    setPasswordChangingSuccess: (bool: boolean) => ({type: "SET_PASSWORD_CHANGING_SUCCESS", payload: bool} as const),
}

export const getAllUsers = (): ThunkType =>
    async (dispatch: Dispatch<any>) => {
        try {
            const response = await AuthService.getAllUsers();
            dispatch(actions.setUserList(response.data));
        } catch (e) {
            console.log(e);
        }
    }

export const getUser = (id: string): ThunkType =>
    async (dispatch: Dispatch<any>) => {
        try {
            const response = await UserService.getUserUsingId(id)
            if (response.data.resultCode === 1) {
                dispatch(actions.setUser(response.data.data))
                return response.data.data
            } else {
                console.log('get user by id error')
            }
        } catch (e) {
            console.log(e)
        }
    }

export const passwordChanging = (user: IUser, lastPassword: string, newPassword: string): ThunkType =>
    async (dispatch: Dispatch<any>) => {
        try {
            const response = await UserService.passwordChanging(user.username, lastPassword, newPassword);
            if (response.data.resultCode === 1) {
                dispatch(actions.setPasswordChangingSuccess(true));
                return response
            } else {
                dispatch(actions.setPasswordChangingError(true));
            }
        } catch (e) {
            console.log(e);
        }
    }

export const changeUserRoleRequest = (userId: string): ThunkType =>
    async () => {
        try {
            const response = await UserService.changeUserRoleRequest(userId);
            if (response.data.resultCode === 1) {
                return response
            }
        } catch (e) {
            console.log(e);
        }
    }



export default userReducer;
