const Router = require("express");
const userController = require("../controllers/userController");

const router = new Router();

router.post('/changeUserData', userController.userDataChanging)
router.get('/changePassword', userController.passwordChanging)

module.exports = router;

