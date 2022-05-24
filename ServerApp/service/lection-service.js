const CourseModel = require('../models/course-model');
const LectionModel = require('../models/lection-model');
const {ObjectId} = require("mongodb");

class LectionService {
    async addLection(title, description, duration, link, homework, courseId) {
        const course = await CourseModel.findOne({_id: courseId});
        if (!course) {
            throw new Error(`Course with id ${courseId} not exists`);
        }
        const lection = await LectionModel.create({title, description, duration, link, homework, 'course._id': ObjectId(courseId) });
        if (!lection) {
            throw new Error('Lection creating error');
        }
        return {
            lection
        }
    }

    async deleteLection(lectionId) {
        const lection = await LectionModel.findOne({_id: lectionId})
        if (!lection) {
            throw new Error(`No lection with id ${lectionId}`)
        }
        const deletedLection = await lection.deleteOne({_id: lectionId});
        return {
            deletedLection
        }
    }

    async changeLectionData(lectionId, title, description, duration, link, homework) {
        const lection = await LectionModel.findOne({_id: lectionId})
        if (!lection) {
            throw new Error(`No lection with id ${lectionId}`)
        }
        const updatedLectionResult = await LectionModel.updateOne({
            _id: lectionId
        }, {
            $set: {
                title: title,
                description: description,
                duration: duration,
                link: link,
                homework: homework
            }
        });
        return {
            updatedLectionResult
        }
    }

    async getLectionsFromCourse(courseId) {
        const course = await CourseModel.findOne({_id: courseId})
        if (!course) {
            throw new Error(`No course with id ${courseId}`)
        }
        const lections = await LectionModel.find({ 'course._id': ObjectId(courseId) });
        console.log(lections)
        if (!lections || lections.length === 0) {
            throw new Error(`No lections for course with id ${courseId}`)
        }
        return {
            lections
        }
    }
}

module.exports = new LectionService();
