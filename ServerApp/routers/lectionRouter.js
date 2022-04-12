const Router = require("express");
const lectionController = require("../controllers/lectionController");
const router = new Router();

router.get('/getLectionsFromCourse/:id', lectionController.getLectionsFromCourse);
router.post("/addLection", lectionController.addLection);
router.post("/updateLectionData", lectionController.changeLectionData);
router.delete('/deleteLectionById/:id', lectionController.deleteLection)


module.exports = router;
