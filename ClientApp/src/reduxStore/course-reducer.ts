import {BaseThunkType, InferActionsTypes} from "./store";
import {ICourse} from "../models/ICourse";
import CourseService from "../services/CourseService";
import {Dispatch} from "react";

export type InitialStateType = typeof INITIAL_STATE;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const INITIAL_STATE = {

    courses: [] as ICourse[],

    /* Errors */
    getAllCourseError: false,
    addCourseError: false
}

const courseReducer = (state = INITIAL_STATE, action: ActionsType) => {
    switch (action.type) {
        case "GET_ALL_COURSE_ERROR": {
            return {
                ...state,
                getAllCourseError: action.payload
            }
        }
        case "SET_COURSES": {
            return {
                ...state,
                courses: action.payload
            }
        }
        case "SET_ADD_COURSE_ERROR": {
            return {
                ...state,
                addCourseError: action.payload
            }
        }
        case "ADD_NEW_COURSE": {
            return {
                ...state,
                courses: [...state.courses, action.payload]
            }
        }
        default:
            return state
    }
}

const actions = {
    setGetAllCourseError: (bool: boolean) => ({type: "GET_ALL_COURSE_ERROR", payload: bool} as const),
    setCourses: (courses: Array<ICourse>) => ({type: "SET_COURSES", payload: courses} as const),
    setAddCourseError: (bool: boolean) => ({type: "SET_ADD_COURSE_ERROR", payload: bool} as const),
    addNewCourse: (course: ICourse) => ({type: "ADD_NEW_COURSE", payload: course} as const)
}

export const addCourse = (user: string, title: string, theme: string, description: string, price: string): ThunkType =>
    async (dispatch: Dispatch<any>) => {
        try {
            const response = await CourseService.addCourse(user, title, theme, description, price);
            if (response.data.resultCode === 1) {
                return response.data.data
            }
            if (response.data.resultCode === 0) {
                dispatch(actions.setAddCourseError(true))
            }
        } catch (e) {
            console.log(e);
        }
    }

export const changeCourseData = (courseId: string, newTitle: string, newTheme: string, newDescription: string, newPrice: string): ThunkType =>
    async () => {
        try {
            const response = await CourseService.changeCourseData(courseId, newTitle, newTheme, newDescription, newPrice)
            if (response.data.resultCode === 1) {
                return response.data.data
            }
            if (response.data.resultCode === 0) {
                console.log('error')
            }
        } catch (e) {
            console.log(e);
        }
    }

export const getAllCourses = (): ThunkType =>
    async (dispatch: Dispatch<any>) => {
        try {
            const response = await CourseService.getCourses();
            if (response.data.resultCode === 1) {
                dispatch(actions.setCourses(response.data.data))
            } else {
                dispatch(actions.setGetAllCourseError(true))
            }
        } catch (e) {
            console.log(e);
        }
    }

export default courseReducer
