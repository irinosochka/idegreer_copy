const UserModel = require("../models/user-model");
const CourseModel = require("../models/course-model");
const NotificationModel = require("../models/notification-model");
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
    async removeRoleFromUser(username, roleToRemove) {
        const user = await UserModel.findOne({username})
        if (!user) {
            throw new Error('User with this username dont exist')
        }
        const userWithNewRole = await UserModel.updateOne({
            username
        }, {
            $set: {
                roles: user.roles.filter(role => role !== roleToRemove)
            }
        });
        const updatedUser = await UserModel.findOne({username})
        if (!updatedUser) {
            throw new Error('User with this username dont exist')
        }
        const userDto = new UserDto(updatedUser); //id, username, name, email, roles
        const tokens = tokenService.generateTokens({...userDto})
        await authService.refresh(tokens.refreshToken)
        await tokenService.saveToken(userDto._id, tokens.refreshToken)

        return {
            userWithNewRole,
            ...tokens,
            user: userDto
        }
    }

    async setRoleToUser(userId, roleToAdd) {
        const user = await UserModel.findOne({_id: userId})
        if (!user) {
            throw new Error('User with this username dont exist')
        }
        const userWithNewRole = await UserModel.updateOne({
            _id: userId
        }, {
            $set: {
                roles: [...user.roles, roleToAdd]
            }
        });
        const updatedUser = await UserModel.findOne({_id: userId})
        if (!updatedUser) {
            throw new Error('User with this username dont exist')
        }
        const userDto = new UserDto(updatedUser); //id, username, name, email, roles
        const tokens = tokenService.generateTokens({...userDto})
        await authService.refresh(tokens.refreshToken)
        await tokenService.saveToken(userDto._id, tokens.refreshToken)

        return {
            userWithNewRole,
            ...tokens,
            user: userDto
        }
    }
    async requestRoleFromAdmin(userId) {
        const user = await UserModel.findOne({_id: userId})
        if (!user) {
            throw new Error('User with this username not exists')
        }
        const userWithNewRoleRequest = await UserModel.updateOne({
            _id: userId
        }, {
            $set: {
                isRoleRequest: true
            }
        });
        const updatedUser = await UserModel.findOne({_id: userId})
        if (!updatedUser) {
            throw new Error('User with this username dont exist')
        }

        return {
            userWithNewRoleRequest,
            user: updatedUser
        }
    }
    async userDataChanging(id, newUsername, newName, newEmail, image) {
        // const user = await UserModel.findOne({username: newUsername})
        // if (user) {
        //     throw new Error('User with this username exists')
        // }
        // const userWithEmail = await UserModel.findOne({email: newEmail});
        // if (userWithEmail) {
        //     throw new Error('This email exists')
        // }
        const userWithNewPassword = await UserModel.updateOne({
            _id: id
        }, {
            $set: {
                username: newUsername,
                name: newName,
                email: newEmail,
                image: image
            }
        });
        const updatedUser = await UserModel.findOne({username: newUsername})
        if (!updatedUser) {
            throw new Error('User with this username dont exist')
        }
        const userDto = new UserDto(updatedUser); //id, username, name, email, roles
        const tokens = tokenService.generateTokens({...userDto})
        await authService.refresh(tokens.refreshToken)
        await tokenService.saveToken(userDto._id, tokens.refreshToken)

        return {
            userWithNewPassword,
            ...tokens,
            user: userDto
        }
    }

    async getUserUsingId(id) {
        const user = await UserModel.findOne({_id: id})
        if (!user) {
            throw new Error('User with this username dont exist')
        }
        return {
            user
        }
    }

    async changeUserRoleRequest(id) {
        const user = await UserModel.findOne({_id: id})
        if (!user) {
            throw new Error('User with this username dont exist')
        }
        const userWithNewPassword = await UserModel.updateOne({
            _id: id
        }, {
            $set: {
                isRoleRequest: false
            }
        });
        const updatedUser = await UserModel.findOne({_id: id})

        return {
            userWithNewPassword,
            updatedUser
        }
    }

    async addNotification(date, courseId, type, change) {
        const course = await CourseModel.findOne({_id: courseId});
        if(!course) {
            throw new Error(`There is not exists course with id ${courseId}`)
        }
        const notification = await NotificationModel.create({date, course, type, change});
        return {
            notification
        }
    }

    async getNotification(id) {
        const course = await CourseModel.findOne({_id: id});
        if (!course) {
            throw new Error(`There is not exists course with id ${id}`)
        }
        const notifications = await NotificationModel.find({courseId: id})
        return {
            notifications
        }
    }

}

module.exports = new UserService()
