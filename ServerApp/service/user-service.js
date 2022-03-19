const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const UserDto = require("../dtos/user-dto");
const tokenService = require("./token-service");
const authService = require("./auth-service");

class UserService {
    async passwordChanging(username, lastPassword, newPassword) {
        const user = await UserModel.findOne({username})
        if (!user) {
            throw new Error('User with this email dont exist')
        }
        const isPassEquals = await bcrypt.compare(lastPassword, user.password);
        if (!isPassEquals) {
            throw new Error('Bad last password')
        }
        const hashNewPassword = await bcrypt.hash(newPassword, 3)
        const userWithNewPassword = await UserModel.updateOne({
            username,
            password: user.password
        }, {$set: {password: hashNewPassword}})

        return {
            userWithNewPassword
        }
    }

    async userDataChanging(username, newUsername, newName, newEmail) {
        const user = await UserModel.findOne({username})
        if (!user) {
            throw new Error('User with this username dont exist')
        }
        const userWithNewPassword = await UserModel.updateOne({
            username
        }, {
            $set: {
                username: newUsername.length !== 0 ? newUsername : user.username,
                name: newName.length !== 0 ? newName : user.name,
                email: newEmail.length !== 0 ? newEmail : user.email
            }
        });

        const updatedUser = await UserModel.findOne({username: newUsername.length !== 0 ? newUsername : user.username})
        if (!updatedUser) {
            throw new Error('User with this username dont exist')
        }
        const userDto = new UserDto(updatedUser); //id, username, name, email, roles
        const tokens = tokenService.generateTokens({...userDto})
        await authService.refresh(tokens.refreshToken)
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            userWithNewPassword,
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new UserService()