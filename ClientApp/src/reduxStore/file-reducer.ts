import {BaseThunkType, InferActionsTypes} from "./store";
import {Dispatch} from "react";
import ImageService from "../services/ImageService";
import axios from "axios";

export type InitialStateType = typeof INITIAL_STATE;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const INITIAL_STATE = {
    photo: '' as any
}

const fileReducer = (state = INITIAL_STATE, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET_PHOTO": {
            return {
                ...state,
                photo: action.payload
            }
        }
        default:
            return state
    }
}

export const actions = {
    setPhoto: (photo: string) => ({type: "SET_PHOTO", payload: photo})
}

export const changePhoto = (formData: FormData): ThunkType =>
    async () => {
        return await ImageService.addPhoto(formData)
    }

export const getPhoto = (name: string): ThunkType =>
    async (dispatch: Dispatch<any>) => {
        try {
            const response = await axios.get(`http://localhost:5000/files/${name}`, {responseType: 'arraybuffer'});
            let binary = '';
            const bytes = new Uint8Array(response.data);
            const len = bytes.byteLength;
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            dispatch(actions.setPhoto(window.btoa(binary)))
        } catch (e) {
            console.log(e)
        }
    }


export default fileReducer;
