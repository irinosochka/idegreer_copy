const userService = require("../service/user-service");

class UserController {
    async userDataChanging(req, res) {
        try {
            const {username, password, newUsername, newName, newEmail} = req.body;
            const data = await userService.userDataChanging(username, password, newUsername, newName, newEmail);
            return res.json({data, resultCode: 1})
        } catch(e) {
            return res.json({message: "Login error", resultCode: 0})
        }
    }
    async passwordChanging(req, res) {
        try {
            const {username, password, newPassword} = req.body;
            const data = await userService.passwordChanging(username, password, newPassword);
            return res.json({data, resultCode: 1})
        } catch(e) {
            res.status(505).json({message: "Password changing error", resultCode: 0})
        }
    }
}

module.exports = new UserController()