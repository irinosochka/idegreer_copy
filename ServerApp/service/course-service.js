const CourseModel = require('../models/course-model');
const UserModel = require("../models/user-model")
const bcrypt = require("bcrypt");

class CourseService {
    async addCourse(username, password, title, theme, description) {
        const user = await UserModel.findOne({username});
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw new Error('Bad password')
        }
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