const courseService = require('../service/course-service');

class CourseController {
    async addCourse(req, res) {
        try {
            const {username, title, theme, description, price} = req.body;
            const data = await courseService.addCourse(username, title, theme, description, price);
            return res.json({data, resultCode: 1})
        } catch (e) {
            return res.json({message: 'Adding course error', resultCode: 0})
        }
    }

   async changeCourseData(req, res) {
        try {
            const {courseId, newTitle, newTheme, newDescription, newPrice} = req.body;
            const data = await courseService.changeCourseData(courseId, newTitle, newTheme, newDescription, newPrice);
            return res.json({data, resultCode: 1})
        } catch (e) {
            return res.json({message: 'Adding course error', resultCode: 0})
        }
    }

    async getAllCourses(req, res) {
        try {
            const data = await courseService.getAllCourses(req.query.limit);
            return res.json({data, resultCode: 1});
        } catch(e) {
            return res.json({message: 'Get all courses error', resultCode: 0})
        }
    }
}

module.exports = new CourseController()
