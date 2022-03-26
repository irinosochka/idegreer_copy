const Router = require("express");
const courseController = require("../controllers/courseController");

const router = new Router();

router.post('/add', courseController.addCourse)
router.post('/changeCourseData', courseController.changeCourseData)
router.get('/getAllCourses', courseController.getAllCourses)
router.get('/getCourse/:id', courseController.getCourseById)

module.exports = router;

