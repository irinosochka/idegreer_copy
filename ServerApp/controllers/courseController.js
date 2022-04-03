const courseService = require('../service/course-service');

class CourseController {
    async addCourse(req, res) {
        try {
            const {userId, title, theme, description, price} = req.body;
            const data = await courseService.addCourse(userId, title, theme, description, price);
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
        } catch (e) {
            return res.json({message: 'Get all courses error', resultCode: 0})
        }
    }

    async getCourseById(req, res) {
        try {
            const id = req.params.id;
            const data = await courseService.getCourseById(id);
            return res.json({data, resultCode: 1})
        } catch {
            return res.json({message: "Getting user using id error", resultCode: 0})
        }
    }

    async getCoursesOfAuthor(req, res) {
        try {
           const id = req.params.id;
           const data = await courseService.getCoursesOfAuthor(id);
           return res.json({data, resultCode: 1})
        } catch {
           return res.json({message: "Get course of the author error", resultCode: 0})
        }
    }

    async deleteCourseById(req, res) {
        try {
            const id = req.params.id;
            const data = await courseService.deleteCourseById(id);
            return res.json({data, resultCode: 1})
        } catch {
            return res.json({message: "delete course error", resultCode: 0})
        }
    }
}

module.exports = new CourseController()
