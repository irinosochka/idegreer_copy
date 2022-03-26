import {BaseThunkType, InferActionsTypes} from "./store";
import {IUser} from "../models/IUser";
import {Dispatch} from "react";
import UserService from "../services/UserService";

export type InitialStateType = typeof INITIAL_STATE;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const INITIAL_STATE = {
    roleExistInThisUser: false,
    roleAdded: false,
    roleRemoved: false
}

const roleReducer = (state = INITIAL_STATE, action: ActionsType): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

export const actions = {
    setRoleRemoved: (bool: boolean) => ({type: "SET_ROLE_REMOVED", payload: bool}),
    setRoleAdded: (bool: boolean) => ({type: "SET_ROLE_ADDED", payload: bool}),
    setRoleExistInThisUser: (bool: boolean) => ({type: "SET_ROLE_EXIST_IN_THIS_USER", payload: bool})
}

export const removeRoleFromUser = (username: string, roleToRemove: string): ThunkType =>
    async (dispatch: Dispatch<any>) => {
        try {
            const response = await UserService.removeRoleFromUser(username, roleToRemove);
            if (response.data.resultCode === 1) {
                dispatch(actions.setRoleRemoved(true))
            } else {
                console.log('no this role on this user')
            }
        } catch (e) {
            console.log(e)
        }
    }

export const roleRequest = (userId: string): ThunkType =>
    async () => {
        try {
            const response = await UserService.roleRequest(userId);
            if (response.data.resultCode === 1) {
                return response
            } else {
                console.log('no this role on this user')
            }
        } catch (e) {
            console.log(e)
        }
    }

export const setRoleToUser = (user: IUser, newRole: string): ThunkType =>
    async (dispatch: Dispatch<any>) => {
        try {
            if (!user.roles.includes(newRole)) {
                const response = await UserService.setRoleToUser(user._id, newRole);
                if (response.data.resultCode === 1) {
                    // this.authUser.roles = response.data.data.user.roles
                    // this.setRoleAdded(true)
                    return response;
                } else {
                    console.log('Role was not added')
                }
            } else {
                dispatch(actions.setRoleExistInThisUser(true));
            }
        } catch (e) {
            console.log(e);
        }
    }

export default roleReducer;
