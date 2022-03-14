const {validationResult} = require('express-validator')
const authService = require('../service/auth-service');

class AuthController {
    async login(req, res) {
        try {
            const {username, password} = req.body;
            const data = await authService.login(username, password);
            res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60* 1000, httpOnly: true})
            return res.json({data, resultCode: 1})
        } catch (e) {
            return res.json({message: "Login error", resultCode: 0})
        }
    }

    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({message: "Registration error", errors})
            }
            const {username, password} = req.body;
            const userData = await authService.registration(username, password);

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60* 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            res.status(505).json({message: "Registration error " + e})
        }
    }

    async refresh(req, res) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await authService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60* 1000, httpOnly: true})
            return res.json(userData)
        } catch(e) {
            res.status(505).json({message: "Refresh error"})
        }
    }

    async logout(req, res) {
        try {
            const {refreshToken} = req.cookies;
            const token = await authService.logout(refreshToken)
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch(e) {
            res.status(505).json({message: "Logout error " + e})
        }
    }

    async getUsers(req, res) {
        try {
            return res.json(await authService.getAllUsers())
        } catch (e) {
            res.status(505).json({message: "No users"})
        }
    }
}

module.exports = new AuthController()