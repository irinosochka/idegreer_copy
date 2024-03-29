const userService = require("../service/user-service");

class UserController {
    async userDataChanging(req, res) {
        try {
            const {id, newUsername, newName, newEmail} = req.body;
            const image = req.file;
            const data = await userService.userDataChanging(id, newUsername, newName, newEmail, image);
            return res.json({data, resultCode: 1})
        } catch(e) {
            return res.json({status: e.status, message: `User with this username or email actually exists` , resultCode: 0})
        }
    }
    async addNewRoleToUser(req,res) {
        try {
            const {userId, newRole} = req.body;
            const data = await userService.setRoleToUser(userId, newRole);
            return res.json({data, resultCode: 1})
        } catch (e) {
            return res.json({message: "Role adding error", resultCode: 0})
        }
    }
    async removeRoleFromUser(req, res) {
        try {
            const {username, roleToRemove} = req.body;
            const data = await userService.removeRoleFromUser(username, roleToRemove);
            return res.json({data, resultCode: 1})
        } catch (e) {
            return res.json({message: "Role removing error", resultCode: 0})
        }
    }
    async requestRoleFromAdmin(req, res) {
        try {
           const {userId} = req.body;
           const data = await userService.requestRoleFromAdmin(userId);
           return res.json({data, resultCode: 1})
        } catch {
           return res.json({message: "Request role error", resultCode: 0})
        }
    }
    async passwordChanging(req, res) {
        try {
            const {username, password, newPassword} = req.body;
            const data = await userService.passwordChanging(username, password, newPassword);
            return res.json({data, resultCode: 1})
        } catch(e) {
            return res.json({message: "Password changing error", resultCode: 0})
        }
    }
    async changeUserRoleRequest(req, res) {
        try {
            const {userId} = req.body;
            const data = await userService.changeUserRoleRequest(userId);
            return res.json({data, resultCode: 1})
        } catch (e) {
            return res.json({message: "Change user role request", resultCode: 0})
        }
    }
    async getUserUsingId(req, res) {
        try {
           const id = req.params.id;
           const data = await userService.getUserUsingId(id);
           return res.json({data, resultCode: 1})
        } catch {
           return res.json({message: "Getting user using id error", resultCode: 0})
        }
    }

    async addNotification(req, res) {
        try {
           const {date, courseId, type, change} = req.body;
           const data = await userService.addNotification(date, courseId, type, change);
           return res.json({data, resultCode: 1})
        } catch {
           return res.json({message: 'add notification error', resultCode: 0})
        }
    }

    async getNotification(req, res) {
        try {
           const id = req.params.id;
           const data = await userService.getNotification(id);
           return res.json({data, resultCode: 1})
        } catch {
           return res.json({message: 'get notification error', resultCode: 0})
        }
    }

    async setMark(req, res) {
        try {
            const {userId, courseId, lectionId, mark} = req.body;
            const data = await userService.setMark(userId, courseId, lectionId, mark);
            return res.json({data, resultCode: 1})
        } catch {
            return res.json({message: 'set mark error', resultCode: 0})
        }
    }
}

module.exports = new UserController()
