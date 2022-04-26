import {ICourse} from "./ICourse";

export interface ILection {
    _id: string,
    title: string,
    description: string,
    duration: string,
    link: string,
    course: ICourse
}
