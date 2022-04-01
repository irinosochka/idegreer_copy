const CourseModel = require('../models/course-model');
const LectionModel = require('../models/lection-model');

class LectionService {
    async addLection(title, description, duration, link, courseId) {
        const course = await CourseModel.findOne({_id: courseId});
        console.log(course)
        const lection = await LectionModel.create({title, description, duration, link, course: course});
        return {
            lection
        }
    }

    async getLectionsFromCourse(courseId) {
        const lections = await LectionModel.find({courseId: courseId});
        return {
            lections
        }
    }
}

module.exports = new LectionService();
