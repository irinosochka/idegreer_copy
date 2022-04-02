const CourseModel = require('../models/course-model');
const LectionModel = require('../models/lection-model');

class LectionService {
    async addLection(title, description, duration, link, courseId) {
        const course = await CourseModel.findOne({_id: courseId});
        if (!course) {
            throw new Error(`Course with id ${courseId} not exists`);
        }
        const lection = await LectionModel.create({title, description, duration, link, course: course});
        if (!lection) {
            throw new Error('Lection creating error');
        }
        return {
            lection
        }
    }

    async getLectionsFromCourse(courseId) {
        const course = await CourseModel.findOne({_id: courseId})
        if (!course) {
            throw new Error(`No course with id ${courseId}`)
        }
        const lections = await LectionModel.find({course: course});
        if (!lections) {
            throw new Error(`No lections for course with id ${courseId}`)
        }
        return {
            lections
        }
    }
}

module.exports = new LectionService();
