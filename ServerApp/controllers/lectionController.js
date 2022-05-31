const lectionService = require('../service/lection-service')

class LectionController {
    async addLection(req, res) {
        try {
            const {title, description, link, homework, courseId} = req.body;
            const data = await lectionService.addLection(title, description, link, homework, courseId)
            return res.json({data, resultCode: 1})
        } catch (e) {
            return res.json({message: "Add lection error", resultCode: 0})
        }
    }

    async deleteLection(req, res) {
        try {
            const id = req.params.id;
            const data = await lectionService.deleteLection(id);
            return res.json({data, resultCode: 1})
        } catch {
            return res.json({message: "Delete lection error", resultCode: 0})
        }
    }

    async changeLectionData(req, res) {
        try {
            const {lectionId, title, description, link, homework} = req.body;
            const data = await lectionService.changeLectionData(lectionId, title, description, link, homework);
            return res.json({data, resultCode: 1})
        } catch {
            return res.json({message: "Change lection data error", resultCode: 0})
        }
    }

    async getLectionsFromCourse(req, res) {
        try {
            const courseId = req.params.id;
            const data = await lectionService.getLectionsFromCourse(courseId)
            return res.json({data, resultCode: 1})
        } catch (e) {
            return res.json({message: "Get lections error", resultCode: 0})
        }
    }

    async getHomeworkResponse(req, res) {
        try {
            const {courseId, userId, lectionId} = req.params;
            const data = await lectionService.getHomeworkResponse(courseId, userId, lectionId)
            return res.json({data, resultCode: 1})
        } catch (e) {
            return res.json({message: "Get lections error", resultCode: 0})
        }
    }

    async getMembersWithHomework(req, res) {
        try {
            const {courseId, lectionId} = req.params;
            const data = await lectionService.getMembersWithHomework(courseId, lectionId)
            return res.json({data, resultCode: 1})
        } catch (e) {
            return res.json({message: "Get members error", resultCode: 0})
        }
    }

    async addHomeworkResponse(req, res) {
        try {
           const {userId, courseId, lectionId, response} = req.body;
           const data = await lectionService.addHomeworkResponse(userId, courseId, lectionId, response, null);
           return res.json({data, resultCode: 1})
        } catch (e) {
            return res.json({message: "Add homework response error", resultCode: 0})
        }
    }
}

module.exports = new LectionController()
