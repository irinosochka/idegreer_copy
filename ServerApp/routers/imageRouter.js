const Router = require("express");
const router = new Router();
const uploadController = require("../controllers/uploadController");

router.post("/upload", uploadController.uploadFiles);
router.get("/files", uploadController.getListFiles);
router.get("/files/:name", uploadController.download);


module.exports = router;
