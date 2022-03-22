import {IUser} from "./IUser";

export interface ICourse {
    _id: string,
    title: string,
    theme: string,
    description: string,
    author: IUser,
    price: string
}
