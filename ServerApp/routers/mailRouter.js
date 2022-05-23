const Router = require("express");
const mailController = require("../controllers/mailController");
const router = new Router();

router.post('/sendmail', mailController.sendMail)


module.exports = router;
