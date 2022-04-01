import {BaseThunkType, InferActionsTypes} from "./store";
import {Dispatch} from "react";
import {ILection} from "../models/ILection";
import LectionService from "../services/LectionService";

export type InitialStateType = typeof INITIAL_STATE;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const INITIAL_STATE = {
    lections: [] as Array<ILection>,
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
        default:
            return state
    }
}

export const actions = {
    getLectionFromCourseById: (lections: ILection[]) => ({type: "GET_LECTION_FROM_COURSE_ID", payload: lections} as const),
    setLections: () => ({type: "SET_LECTION"} as const)
}

export const getAllLectionsFromCourse = (courseId: string): ThunkType => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await LectionService.getLectionUsingCourseId(courseId);
            if (response.data.resultCode === 1) {
                dispatch(actions.getLectionFromCourseById(response.data.data.lections))
            } else {
            }
        } catch(e) {
            console.log(e);
        }
    }
}

export default lectionReducer;
