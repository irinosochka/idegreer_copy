const userService = require("../service/user-service");

class UserController {
    async userDataChanging(req, res) {
        try {
            const {username, newUsername, newName, newEmail} = req.body;
            const data = await userService.userDataChanging(username, newUsername, newName, newEmail);
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
    async passwordChanging(req, res) {
        try {
            const {username, password, newPassword} = req.body;
            const data = await userService.passwordChanging(username, password, newPassword);
            return res.json({data, resultCode: 1})
        } catch(e) {
            return res.json({message: "Password changing error", resultCode: 0})
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
}

module.exports = new UserController()
