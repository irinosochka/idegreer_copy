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

    async getAllCourses(limit = 0) {
        return CourseModel.find().limit(limit)
    }

    async getCourseById(courseId) {
        return CourseModel.findOne({_id: courseId})
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

    async deleteCourseById(courseId) {
        const course = await CourseModel.findOne({_id: courseId});
        if(!course) {
            throw new Error('This course not exists')
        }
        console.log(course)
        const deletedCourse = await course.deleteOne({_id: courseId});
        return {
            deletedCourse
        }
    }
}

module.exports = new CourseService()
