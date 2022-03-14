const UserModel = require("../models/user-model")
const tokenService = require('../service/token-service');
const UserDto = require('../dtos/user-dto');
const bcrypt = require('bcrypt');

class AuthService {
    async registration(username, password, name) {
        const candidate = await UserModel.findOne({username})
        if(candidate) {
            throw new Error(`User with username ${username} actually exist`)
        }
        const hashPassword  = await bcrypt.hash(password, 3)

        const user = await UserModel.create({username, password: hashPassword, name, roles: ['STUDENT']})
        const userDto = new UserDto(user); //id, username, name, roles
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async login(username, password) {
        const user = await UserModel.findOne({username})
        if (!user) {
            throw new Error('User with this email dont exist')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw new Error('Bad password')
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        return await tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw new Error('User wa not authorized')
        }
        const userData = await tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDb) {
            throw new Error('User was not authorized')
        }
        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async getAllUsers() {
        return UserModel.find();
    }
}

module.exports = new AuthService()