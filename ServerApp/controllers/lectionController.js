const lectionService = require('../service/lection-service')

class LectionController {
    async addLection(req, res) {
        try {
            const {title, description, duration, link, homework, courseId} = req.body;
            const data = await lectionService.addLection(title, description, duration, link, homework, courseId)
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
            const {lectionId, title, description, duration, link, homework} = req.body;
            const data = await lectionService.changeLectionData(lectionId, title, description, duration, link, homework);
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
            return res.json({message: "Add lection error", resultCode: 0})
        }
    }
}

module.exports = new LectionController()
