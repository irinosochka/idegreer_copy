import {BaseThunkType, InferActionsTypes} from "./store";
import {ICourse} from "../models/ICourse";
import CourseService from "../services/CourseService";
import {Dispatch} from "react";
import {IUser} from "../models/IUser";

export type InitialStateType = typeof INITIAL_STATE;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const INITIAL_STATE = {

    course: {} as { course: ICourse, author: IUser },
    courses: [] as Array<any>,
    authorCourses: [] as Array<any>,
    userCourses: [] as Array<any>,
    members: [] as Array<any>, //to change

    /* Errors */
    getAllCourseError: false,
    addCourseError: false,
    addUserToCourseError: false,

    /*Success*/
    courseDataChangedSuccess: false,
    deleteCourseByIdSuccess: false,
    addUserToCourseSuccess: false
}

const courseReducer = (state: InitialStateType = INITIAL_STATE, action: ActionsType) => {
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

        case "SET_COURSE": {
            return {
                ...state,
                course: action.payload
            }
        }

        case "SET_ADD_COURSE_ERROR": {
            return {
                ...state,
                addCourseError: action.payload
            }
        }

        case "ADD_NEW_COURSE": {
            console.log(action.payload)
            return {
                ...state,
                courses: [...state.courses, action.payload]
            }
        }

        case "SET_COURSE_DATA_CHANGING_SUCCESS": {
            return {
                ...state,
                courseDataChangedSuccess: action.payload
            }
        }

        case "SET_DELETE_COURSE_BY_ID_SUCCESS": {
            return {
                ...state,
                deleteCourseByIdSuccess: action.payload
            }
        }

        case "SET_AUTHOR_COURSES": {
            return {
                ...state,
                authorCourses: action.payload
            }
        }

        case "SET_USER_COURSES": {
            return {
                ...state,
                userCourses: action.payload
            }
        }

        case "GET_ALL_MEMBERS_FROM_COURSE": {
            return {
                ...state,
                members: action.payload
            }
        }

        case "CLEAR_MEMBERS": {
            return {
                ...state,
                members: []
            }
        }

        case "SET_ADD_USER_TO_COURSE_ERROR": {
            return {
                ...state,
                addUserToCourseError: action.payload
            }
        }

        case "SET_ADD_USER_TO_COURSE_SUCCESS": {
            return {
                ...state,
                addUserToCourseSuccess: action.payload
            }
        }

        case "CLEAR_COURSE": {
            return {
                ...state,
                course: {} as {course: ICourse, author: IUser}
            }
        }

        default:
            return state
    }
}

export const actions = {
    setGetAllCourseError: (bool: boolean) => ({type: "GET_ALL_COURSE_ERROR", payload: bool} as const),
    setCourses: (courses: Array<any>) => ({type: "SET_COURSES", payload: courses} as const),
    setCourse: (course: { course: ICourse, author: IUser }) => ({type: "SET_COURSE", payload: course} as const),
    setAddCourseError: (bool: boolean) => ({type: "SET_ADD_COURSE_ERROR", payload: bool} as const),
    setCourseDataChangedSuccess: (bool: boolean) => ({
        type: "SET_COURSE_DATA_CHANGING_SUCCESS",
        payload: bool
    } as const),
    addNewCourse: (course: ICourse) => ({type: "ADD_NEW_COURSE", payload: course} as const),
    setDeleteCourseByIdSuccess: (bool: boolean) => ({type: "SET_DELETE_COURSE_BY_ID_SUCCESS", payload: bool} as const),
    setAuthorCourses: (courses: Array<any>) => ({type: "SET_AUTHOR_COURSES", payload: courses} as const),
    setUserCourses: (courses: Array<any>) => ({type: "SET_USER_COURSES", payload: courses} as const),
    getAllMembersFromCourse: (members: Array<IUser>) => ({type: "GET_ALL_MEMBERS_FROM_COURSE", payload: members} as const),
    clearMembers: () => ({type: "CLEAR_MEMBERS"} as const),
    clearCourse: () => ({type: "CLEAR_COURSE"} as const),
    setAddUserToCourseError: (bool: boolean) => ({type: "SET_ADD_USER_TO_COURSE_ERROR", payload: bool} as const),
    setAddUserToCourseSuccess: (bool: boolean) => ({type: "SET_ADD_USER_TO_COURSE_SUCCESS", payload: bool} as const),
}

export const addCourse = (userId: string, title: string, theme: string, description: string, price: string): ThunkType =>
    async (dispatch: Dispatch<any>) => {
        try {
            const response = await CourseService.addCourse(userId, title, theme, description, price);
            if (response.data.resultCode === 1) {
                dispatch(actions.addNewCourse(response.data.data.course))
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
    async (dispatch: Dispatch<any>) => {
        try {
            const response = await CourseService.changeCourseData(courseId, newTitle, newTheme, newDescription, newPrice)
            if (response.data.resultCode === 1) {
                dispatch(actions.setCourseDataChangedSuccess(true));
                return response.data.data
            }
            if (response.data.resultCode === 0) {
                dispatch(actions.setAddCourseError(true))
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
                dispatch(actions.setCourses(response.data.data.courses))
            } else {
                dispatch(actions.setGetAllCourseError(true))
            }
        } catch (e) {
            console.log(e);
        }
    }

export const getCoursesOfAuthor = (authorId: string): ThunkType =>
    async (dispatch: Dispatch<any>) => {
        try {
            const response = await CourseService.getCoursesOfAuthor(authorId);
            if (response.data.resultCode === 1) {
                dispatch(actions.setAuthorCourses(response.data.data.courses))
            } else {
                console.log(`Can't get courses of the author ${authorId}`);
            }
        } catch (e) {
            console.log(e);
        }
    }

export const getCoursesOfUser = (userId: string): ThunkType =>
    async (dispatch: Dispatch<any>) => {
        try {
            const response = await CourseService.getUserCourseList(userId);
            if (response.data.resultCode === 1) {
                dispatch(actions.setUserCourses(response.data.data.courses))
            } else {
            }
        } catch (e) {
            console.log(e);
        }
    }

export const deleteCourseById = (courseId: string): ThunkType =>
    async (dispatch: Dispatch<any>) => {
       try {
           const response = await CourseService.deleteCourse(courseId);
           if(response.data.resultCode === 1){
               dispatch(actions.setDeleteCourseByIdSuccess(true));
               return response.data.data
           } else {
               //
           }
       } catch (e) {
           console.log(e);
       }
    }

export const getOneCourse = (courseId: string): ThunkType =>
    async (dispatch: Dispatch<any>) => {
        try {
            const response = await CourseService.getCourse(courseId);
            if (response.data.resultCode === 1) {
                dispatch(actions.setCourse(response.data.data.course))
            } else {
            }
        } catch (e) {
            console.log(e);
        }
    }

export const getAllMembersFromCourse = (courseId: string): ThunkType => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await CourseService.getAllUsersFromCourse(courseId);
            if (response.data.resultCode === 1) {
                dispatch(actions.getAllMembersFromCourse(response.data.data.userList))
            }
        } catch(e) {
            console.log(e);
        }
    }
}

export const addUserToCourse = (courseId: string, userId: string): ThunkType => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await CourseService.addUserToCourse(courseId, userId);
            if (response.data.resultCode === 1) {
                dispatch(actions.setAddUserToCourseSuccess(true));
            } else {
                dispatch(actions.setAddUserToCourseError(true));
            }
        } catch(e) {
            console.log(e);
        }
    }
}

export const setCourseChanges = (courseId: string): ThunkType => {
    return async () => {
        try {
            await CourseService.setCourseChanges(courseId);
        } catch(e) {
            console.log(e);
        }
    }
}

export const getMembersCountOfCourse = (courseId: string): ThunkType => {
    return async () => {
        try {
            const response = await CourseService.getMembersCountOfCourse(courseId);
            if (response.data.resultCode === 1) {
                return response.data.data.membersCount
            } else {
                console.log('course changing error')
            }
        } catch(e) {
            console.log(e);
        }
    }
}

export default courseReducer;
