import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import authReducer from "./auth-reducer";
import fileReducer from "./file-reducer";
import courseReducer from "./course-reducer";
import userReducer from "./user-reducer";
import roleReducer from "./role-reducer";
import lectionReducer from "./lection-reducer";

let rootReducer = combineReducers({
    auth: authReducer,
    file: fileReducer,
    course: courseReducer,
    user: userReducer,
    role: roleReducer,
    lection: lectionReducer
})

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

// @ts-ignore
window.__store__ = store

export default store
