import {$user} from "../http";

export default class UserService {
    static userDataChanging(username: string, newUsername: string, newName: string, newEmail: string): Promise<any> {
        return $user.post('/changeUserData', {username, newUsername, newName, newEmail}).then(res => {
            return res
        }).catch(e => console.log(e))
    }

    static passwordChanging(username: string, password: string, newPassword: string): Promise<any> {
        return $user.post('/changePassword', {username, password, newPassword}).then(res => {
            return res
        }).catch(e => console.log('err ' + e))
    }

    static setRoleToUser(username: string, newRole: string): Promise<any> {
        return $user.post('/addNewRoleToUser', {username, newRole}).then(res => {
            return res
        }).catch(e => console.log('err ' + e))
    }

    static removeRoleFromUser(username: string, roleToRemove: string): Promise<any> {
        return $user.post('/removeRoleFromUser', {username, roleToRemove}).then(res => {
            return res
        }).catch(e => console.log('err ' + e))
    }
}
