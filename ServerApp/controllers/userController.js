const userService = require("../service/user-service");

class UserController {
    async userDataChanging(req, res) {
        try {
            const {username, newUsername, newName, newEmail} = req.body;
            const data = await userService.userDataChanging(username, newUsername, newName, newEmail);
            return res.json({data, resultCode: 1})
        } catch(e) {
            return res.json({message: "Login error", resultCode: 0})
        }
    }
    async addNewRoleToUser(req,res) {
        try {
            const {username, newRole} = req.body;
            const data = await userService.setRoleToUser(username, newRole);
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
}

module.exports = new UserController()
