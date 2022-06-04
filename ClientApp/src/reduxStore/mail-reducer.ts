import {BaseThunkType, InferActionsTypes} from "./store";
import MailService from "../services/MailService";

export type InitialStateType = typeof INITIAL_STATE;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export enum mailMessageType {
    ADD_LECTION = 'addLection',
    EDIT_LECTION = 'editLection',
    EDIT_COURSE = 'editCourse'
}

const INITIAL_STATE = {
    photo: '' as any
}

const mailReducer = (state = INITIAL_STATE, action: ActionsType): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

export const actions = {}

export const sendEditMail = (courseId: string, lectionTitle: string, messageType: mailMessageType): ThunkType =>
    async () => {
    console.log(messageType)
    let message;
        switch (messageType) {
            case 'addLection':
                message = `Course ${lectionTitle} was edited.`
                break;
            case 'editLection':
                message = `Lection ${lectionTitle} was edited.`
                break;
            case 'editCourse':
                message = `Course ${lectionTitle} was edited.`
                break;
            default:
                message = `Course ${lectionTitle} was deleted.`
                break;
        }
        await MailService.sendMailAboutLectionChange(courseId, message)

        return
    }



export default mailReducer;
