const CourseModel = require('../models/course-model');
const LectionModel = require('../models/lection-model');
const UserModel = require('../models/user-model');
const HomeworkModel = require('../models/homework-model');
const CourseService = require('../service/course-service');
const {ObjectId} = require("mongodb");

class LectionService {
    async addLection(title, description, link, homework, courseId) {
        const course = await CourseModel.findOne({_id: courseId});
        if (!course) {
            throw new Error(`Course with id ${courseId} not exists`);
        }
        const lection = await LectionModel.create({title, description, link, homework, 'course._id': ObjectId(courseId) });
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

    async changeLectionData(lectionId, title, description, link, homework) {
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

        if (!lections || lections.length === 0) {
            throw new Error(`No lections for course with id ${courseId}`)
        }
        return {
            lections
        }
    }

    async getHomeworkResponse(courseId, userId, lectionId) {
        const course = await CourseModel.findOne({_id: courseId})
        if (!course) {
            throw new Error(`No course with id ${courseId}`)
        }
        const user = await UserModel.findOne({_id: userId});
        if (!user) {
            throw new Error(`No user with id ${userId}`)
        }
        const lection = await LectionModel.findOne({_id: lectionId})
        if (!lection) {
            throw new Error(`No lection with id ${lectionId}`)
        }
        const homeworkResponse = await HomeworkModel.find({courseId:  courseId, userId: userId, lectionId: lectionId});
        return {
            homeworkResponse: Array.isArray(homeworkResponse) ? homeworkResponse[0] : homeworkResponse
        }
    }

    async addHomeworkResponse(userId, courseId, lectionId, response, mark) {
        const user = await UserModel.findOne({_id: userId})
        if (!user) {
            throw new Error(`No user with id ${userId}`)
        }
        const course = await CourseModel.findOne({_id: courseId})
        if (!course) {
            throw new Error(`No course with id ${courseId}`)
        }
        const lection = await LectionModel.findOne({_id: lectionId})
        if (!lection) {
            throw new Error(`No lection with id ${lectionId}`)
        }
        const homework = await HomeworkModel.create({userId, courseId, lectionId, response, mark});
        return {
            homework
        }
    }

    async getMembersWithHomework(courseId, lectionId) {
        const course = await CourseModel.findOne({_id: courseId})
        if (!course) {
            throw new Error(`No course with id ${courseId}`)
        }
        const lection = await LectionModel.findOne({_id: lectionId})
        if (!lection) {
            throw new Error(`No lection with id ${lectionId}`)
        }
        const users = await CourseService.getAllUsersFromCourse(courseId);
        console.log(users)
        let usersWithHomeWork = [];

        for (let i = 0; i < users.userList.length; i++) {
            const userWithHomework = await HomeworkModel.findOne({'ObjectId("userId")': users.userList[i]._id, courseId: courseId, lectionId: lectionId})
            usersWithHomeWork.push(userWithHomework)
        }
        return {
            usersWithHomeWork
        }
    }


}

module.exports = new LectionService();
