const Router = require("express");
const courseController = require("../controllers/courseController");

const router = new Router();

router.post('/add', courseController.addCourse)
router.post('/changeCourseData', courseController.changeCourseData)
router.post('/addUserToCourse', courseController.addUserToCourse)
router.post('/setCourseChanges', courseController.setCourseChanges)
router.get('/getAllCourses', courseController.getAllCourses)
router.get('/getCourse/:id', courseController.getCourseById)
router.get('/getCoursesByAuthorId/:id', courseController.getCoursesOfAuthor)
router.get('/getUserCourseList/:id', courseController.getUserCourseList)
router.get('/getAllUsersFromCourse/:id', courseController.getAllUsersFromCourse)
router.get('/getAllUsersFromCourse/:id', courseController.getAllUsersFromCourse)
router.get('/getMembersCountOfCourse/:id', courseController.getMembersCountOfCourse)
router.delete('/deleteCourseById/:id', courseController.deleteCourseById)

module.exports = router;

