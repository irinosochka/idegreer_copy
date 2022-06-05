import {$user} from "../http";

export default class UserService {
    static userDataChanging(formData: FormData): Promise<any> {
        return $user.post('/changeUserData', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            return res
        }).catch(e => console.log(e))
    }

    static passwordChanging(username: string, password: string, newPassword: string): Promise<any> {
        return $user.post('/changePassword', {username, password, newPassword}).then(res => {
            return res
        }).catch(e => console.log('err ' + e))
    }

    static setRoleToUser(userId: string, newRole: string): Promise<any> {
        return $user.post('/addNewRoleToUser', {userId, newRole}).then(res => {
            return res
        }).catch(e => console.log('err ' + e))
    }

    static roleRequest(userId: string): Promise<any> {
        return $user.post('/requestRoleFromAdmin', {userId}).then(res => {
            return res
        }).catch(e => console.log('err ' + e))
    }

    static changeUserRoleRequest(userId: string): Promise<any> {
        return $user.post('/changeUserRoleRequest', {userId}).then(res => {
            return res
        }).catch(e => console.log('err ' + e))
    }

    static removeRoleFromUser(username: string, roleToRemove: string): Promise<any> {
        return $user.post('/removeRoleFromUser', {username, roleToRemove}).then(res => {
            return res
        }).catch(e => console.log('err ' + e))
    }

    static getUserUsingId(id: string): Promise<any> {
        return $user.get(`/getUser/${id}`).then(res => {
            return res
        }).catch(e => console.log('err ' + e))
    }

    static addNotification(date: string, courseId: string, type: string, change: Array<string> | []): Promise<any> {
        return $user.post('/addNotification', {date, courseId, type, change}).then(res => {
            return res
        }).catch(e => console.log('err ' + e))
    }

    static setMark(userId: string, courseId: string, lectionId: string, mark: string): Promise<any> {
        return $user.post('/setMark', {userId, courseId, lectionId, mark}).then(res => {
            return res
        }).catch(e => console.log('err ' + e))
    }

    static getNotification(id: string): Promise<any> {
        return $user.get(`/getNotifications/${id}`).then(res => {
            return res
        }).catch(e => console.log('err ' + e))
    }
}
