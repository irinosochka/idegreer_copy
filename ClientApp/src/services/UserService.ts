import {$course} from "../http";

export default class UserService {
    static userDataChanging(username: string, password: string, newUsername: string, newName: string, newEmail: string): Promise<any> {
        return $course.post('/changeUserData', {username, password, newUsername, newName, newEmail}).then(res => {
            return res
        }).catch(e => console.log(e))
    }

    static passwordChanging(username: string, password: string, newPassword: string): Promise<any> {
        return $course.post('/changePassword', {username, password, newPassword}).then(res => {
            return res
        }).catch(e => console.log(e))
    }
}