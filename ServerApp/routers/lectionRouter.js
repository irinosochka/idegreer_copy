const Router = require("express");
const lectionController = require("../controllers/lectionController");
const router = new Router();

router.post("/addLection", lectionController.addLection);
router.get("/getLectionsFromCourse", lectionController.getLectionsFromCourse);


module.exports = router;
