const lectionService = require('../service/lection-service')

class LectionController {
    async addLection(req, res) {
        try {
            const {title, description, duration, link, courseId} = req.body;
            const data = await lectionService.addLection(title, description, duration, link, courseId)
            return res.json({data, resultCode: 1})
        } catch (e) {
            return res.json({message: "Add lection error", resultCode: 0})
        }
    }

    async getLectionsFromCourse(req, res) {
        try {
            const {course} = req.body;
            const data = await lectionService.getLectionsFromCourse(course)
            return res.json({data, resultCode: 1})
        } catch (e) {
            return res.json({message: "Add lection error", resultCode: 0})
        }
    }
}

module.exports = new LectionController()
