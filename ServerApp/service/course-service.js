const CourseModel = require('../models/course-model');
const UserModel = require("../models/user-model")

class CourseService {
    async addCourse(username, title, theme, description) {
        const user = await UserModel.findOne({username});
        const course = await CourseModel.create({title, theme, description, author: user});
        // const courseDto = new CourseDto(course) //id, title, theme, desc, author
        return {
            course
        }
    }

    async getAllCourses() {
        return CourseModel.find()
    }
}

module.exports = new CourseService()