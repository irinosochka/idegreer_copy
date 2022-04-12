import {BaseThunkType, InferActionsTypes} from "./store";
import {Dispatch} from "react";
import {ILection} from "../models/ILection";
import LectionService from "../services/LectionService";

export type InitialStateType = typeof INITIAL_STATE;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const INITIAL_STATE = {
    lections: [] as Array<ILection>,

    successGettingLection: false,
    errorGettingLection: false,
    successAddingLection: false,
    errorAddingLection: false,
}

const lectionReducer = (state: InitialStateType = INITIAL_STATE, action: ActionsType) => {
    switch (action.type) {
        case "GET_LECTION_FROM_COURSE_ID": {
            return {
                ...state,
                lections: action.payload
            }
        }
        case "SET_LECTION": {
            return {
                ...state,
                lections: []
            }
        }
        case "ON_SUCCESS_ADDING_LECTION": {
            return {
                ...state,
                successAddingLection: action.payload
            }
        }
        case "ON_ERROR_ADDING_LECTION": {
            return {
                ...state,
                errorAddingLection: action.payload
            }
        }
        case "ON_SUCCESS_GETTING_LECTION": {
            return {
                ...state,
                successGettingLection: action.payload
            }
        }
        case "ON_ERROR_GETTING_LECTION": {
            return {
                ...state,
                errorGettingLection: action.payload
            }
        }
        case "DELETE_LECTION": {
            return {
                ...state,
                lections: state.lections.filter(l => l._id !== action.payload)
            }
        }
        case "CHANGE_LECTION_DATA": {
            return {
                ...state,
                lections: state.lections.filter(l => {
                    if (l._id === action.payload.lectionId) {
                       l.title = action.payload.title;
                       l.link = action.payload.link;
                       l.duration = action.payload.duration;
                       l.description = action.payload.description;
                    }
                })
            }
        }
        default:
            return state
    }
}

export const actions = {
    getLectionFromCourseById: (lections: ILection[]) => ({type: "GET_LECTION_FROM_COURSE_ID", payload: lections} as const),
    setLections: () => ({type: "SET_LECTION"} as const),
    onSuccessAddingLection: (bool: boolean) => ({type: "ON_SUCCESS_ADDING_LECTION", payload: bool} as const),
    onErrorAddingLection: (bool: boolean) => ({type: "ON_ERROR_ADDING_LECTION", payload: bool} as const),
    onSuccessGettingLection: (bool: boolean) => ({type: "ON_SUCCESS_GETTING_LECTION", payload: bool} as const),
    onErrorGettingLection: (bool: boolean) => ({type: "ON_ERROR_GETTING_LECTION", payload: bool} as const),
    deleteLection: (lectionId: string) => ({type: "DELETE_LECTION", payload: lectionId} as const),
    changeLectionData: (body: any) => ({type: "CHANGE_LECTION_DATA", payload: body} as const)
}

export const addLection = (title: string, description: string, duration: string, link: string, courseId: string): ThunkType => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await LectionService.addLection(title, description, duration, link, courseId);
            if (response.data.resultCode === 1) {
                dispatch(actions.onSuccessAddingLection(true));
            } else {
                dispatch(actions.onErrorAddingLection(true));
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export const getAllLectionsFromCourse = (courseId: string): ThunkType => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await LectionService.getLectionUsingCourseId(courseId);
            if (response.data.resultCode === 1) {
                dispatch(actions.getLectionFromCourseById(response.data.data.lections))
                dispatch(actions.onSuccessGettingLection(true))
            } else {
                dispatch(actions.onErrorGettingLection(
                    true))
            }
        } catch(e) {
            console.log(e);
        }
    }
}

export const changeLectionData = (lectionId: string, title: string, description: string, duration: string, link: string): ThunkType =>
    async (dispatch: Dispatch<any>) => {
        try {
            const response = await LectionService.updateLectionData(lectionId, title, description, duration, link)
            if (response.data.resultCode === 1) {
                dispatch(actions.changeLectionData({lectionId, title, description, duration, link}));
                return response.data.data
            } else {
                console.log('change lection error')
            }
        } catch (e) {
            console.log(e);
        }
    }

export const deleteLection = (lectionId: string): ThunkType => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await LectionService.deleteLection(lectionId);
            console.log(response);
            if (response.data.resultCode === 1) {
                dispatch(actions.deleteLection(lectionId))
            } else {
                console.log('delete lection error');
            }
        } catch(e) {
            console.log(e);
        }
    }
}

export default lectionReducer;
