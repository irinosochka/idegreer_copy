const Router = require("express");
const authController = require("../controllers/authController");
const {check} = require("express-validator");

const router = new Router();

router.post('/registration', [
    check('username', "Username can't be empty").notEmpty(),
    check('password', "Password should be more than 8 symbols").isLength({min: 8})
] ,authController.registration)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/users', authController.getUsers)
router.get('/refresh', authController.refresh)

module.exports = router;

