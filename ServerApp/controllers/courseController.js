const courseService = require('../service/course-service');

class CourseController {
    async addCourse(req, res) {
        try {
            const {username, title, theme, description} = req.body;
            const data = await courseService.addCourse(username, title, theme, description);
            return res.json({data, resultCode: 1})
        } catch (e) {
            res.status(505).json({message: 'Adding course error', resultCode: 0})
        }
    }

    async getAllCourses(req, res) {
        try {
            const data = await courseService.getAllCourses();
            return res.json({data, resultCode: 1});
        } catch(e) {
            res.status(505).json({message: 'Get all courses error', resultCode: 0})
        }
    }
}

module.exports = new CourseController()