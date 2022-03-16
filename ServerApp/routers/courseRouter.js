const Router = require("express");
const courseController = require("../controllers/courseController");

const router = new Router();

router.post('/add', courseController.addCourse)
router.get('/getAllCourses', courseController.getAllCourses)

module.exports = router;

