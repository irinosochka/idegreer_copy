const User = require("../models/User")
const Role = require("../models/Role")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {secret} = require("../config");

const generateAccessToken = (id, username, roles) => {
    const payload = {
        id,
        username,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class AuthController {
    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if(!user) {
                return res.status(400).json({message: "Користувач не зареєстрований"})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword) {
                return res.status(400).json({message: "Password is not valid"})
            }
            const token = generateAccessToken(user._id, user.username, user.roles)
            return res.json({token})
        } catch (e) {
            res.status(505).json({message: "There isn't this user"})
        }
    }

    async registration(req, res) {
        try {
            const {username, password} = req.body;
            const candidate = await User.findOne({username})
            if(candidate) {
                return res.status(400).json({message: "Користувач з таким ім'ям вже існує"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "Employee"})
            await User.create({username, password: hashPassword, roles: [userRole.value]});
            return res.json({message: "User was created"})
        } catch (e) {
            res.status(505).json({message: "You can't register"})
        }
    }

    async getUsers(req, res) {
        try {
        } catch (e) {
            res.status(505).json({message: "No users"})
        }
    }
}

module.exports = new AuthController()