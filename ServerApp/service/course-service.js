const CourseModel = require('../models/course-model');
const UserModel = require("../models/user-model")
const {ObjectId} = require("mongodb");

class CourseService {
    async addCourse(userId, title, theme, description, price) {
        const user = await UserModel.findOne({_id: userId});
        if (!user) {
            throw new Error(`User with id ${userId} not exists`)
        }
        const course = await CourseModel.create({title, theme, description, price, 'author._id': ObjectId(userId)});
        // const courseDto = new CourseDto(course) //id, title, theme, desc, price, author
        return {
            course
        }
    }

    async getAllCourses(limit = 0) {
        const courses = await CourseModel.find().limit(limit);
        let coursesList = []
        for (let i = 0; i < courses.length; ++i) {
            const user = await UserModel.findOne({_id: courses[i].author._id});
            coursesList.push({course: courses[i], author: user})
        }
        return {
            courses: coursesList
        }
    }

    async getCourseById(courseId) {
        const course = await CourseModel.findOne({_id: courseId})
        if (!course) {
            throw new Error(`Course with id ${courseId} doesn't exist`)
        }
        console.log(course)
        const user = await UserModel.findOne({_id: course.author._id});
        console.log(user)
        return {
            course: {course: course, author: user}
        }
    }

    async changeCourseData(courseId, newTitle, newTheme, newDescription, newPrice) {
        const courseWithNewData = await CourseModel.updateOne({
            _id: courseId
        }, {
            $set: {
                title: newTitle,
                theme: newTheme,
                description: newDescription,
                price: newPrice
            }
        });
        const course = await CourseModel.findOne({_id: courseId})
        // const courseDto = new CourseDto(course) //id, title, theme, desc, price, author
        return {
            courseWithNewData,
            course
        }
    }

    async getCoursesOfAuthor(authorId) {
        const user = await UserModel.findOne({_id: authorId});
        if (!user) {
            throw new Error(`User with id ${authorId} not exists`);
        }
        const courses = await CourseModel.find({ 'author._id': ObjectId(authorId) });
        if(!courses) {
            throw new Error(`There is not courses of the author ${user.username}`)
        }
        let coursesList = []
        for (let i = 0; i < courses.length; ++i) {
            const user = await UserModel.findOne({_id: courses[i].author._id});
            coursesList.push({course: courses[i], author: user})
        }
        return {
            courses: coursesList
        }
    }

    async addUserToCourse(courseId, userToAddRoleId) {
        const user = await UserModel.findOne({_id: userToAddRoleId});
        if (!user) {
            throw new Error('This user dont exists');
        }
        const course = await CourseModel.findOne({_id: courseId});
        if (!course) {
            throw new Error('This course dont exists');
        }
        const updatedCourseResult = await CourseModel.updateOne({
            _id: courseId
        }, {
            $set: {
                userList: [...course.userList, userToAddRoleId]
            }
        });
        return {
            updatedCourseResult
        }
    }

    async getUserCourseList(userId) {
        const user = await UserModel.findOne({_id: userId});
        if (!user) {
            throw new Error('This user dont exists')
        }
        const userCourseList = await CourseModel.find({ userList: { $all: [userId] } })
        let coursesList = []
        for (let i = 0; i < userCourseList.length; ++i) {
            const user = await UserModel.findOne({_id: userCourseList[i].author._id});
            coursesList.push({course: userCourseList[i], author: user})
        }
        return {
            courses: coursesList
        }
    }

    async getAllUsersFromCourse(courseId) {
        const course = await CourseModel.findOne({_id: courseId});
        if (!course) {
            throw new Error('This course dont exists');
        }

        let userFullInfoList = [];

        for (const u of course.userList) {
            await UserModel.findOne({_id: ObjectId(u)}).then(res => userFullInfoList.push(res));
        }

        return {
            userList: userFullInfoList
        }
    }

    async deleteCourseById(courseId) {
        const course = await CourseModel.findOne({_id: courseId});
        if(!course) {
            throw new Error('This course dont exists')
        }
        const deletedCourse = await course.deleteOne({_id: courseId});
        return {
            deletedCourse
        }
    }

    async setCourseChanges(courseId) {
        const course = await CourseModel.findOne({_id: courseId});
        if(!course) {
            throw new Error('This course dont exists')
        }
        const updatedCourse = await CourseModel.updateOne({
            _id: courseId
        }, {
            $set: {
                wasChanged: true
            }
        });
        return {
            updatedCourse
        }
    }

    async getUserCoursesWithChanges(courseId, userId) {
        const user = await UserModel.findOne({_id: userId});
        if (!user) {
            throw new Error('This user dont exists')
        }
        const course = await CourseModel.findOne({_id: courseId});
        if(!course) {
            throw new Error('This course dont exists')
        }
        return CourseModel.find({wasChanges: true})
    }

    async getMembersCountOfCourse(courseId) {
        const course = await CourseModel.findOne({_id: courseId});
        if(!course) {
            throw new Error('This course doesn\'t exists')
        }
        return {
            membersCount: course.userList.length
        }
    }
}

module.exports = new CourseService()
