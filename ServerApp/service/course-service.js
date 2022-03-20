const CourseModel = require('../models/course-model');
const UserModel = require("../models/user-model")

class CourseService {
    async addCourse(username, title, theme, description, price) {
        const user = await UserModel.findOne({username});
        const course = await CourseModel.create({title, theme, description, price, author: user});
        // const courseDto = new CourseDto(course) //id, title, theme, desc, price, author
        return {
            course
        }
    }

    async getAllCourses() {
        return CourseModel.find()
    }
}

module.exports = new CourseService()
