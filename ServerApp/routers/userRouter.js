const Router = require("express");
const userController = require("../controllers/userController");

const router = new Router();

router.post('/changeUserData', userController.userDataChanging)
router.post('/changePassword', userController.passwordChanging)
router.post('/addNewRoleToUser', userController.addNewRoleToUser)
router.post('/removeRoleFromUser', userController.removeRoleFromUser)
router.post('/requestRoleFromAdmin', userController.requestRoleFromAdmin)
router.get('/getUser/:id', userController.getUserUsingId)

module.exports = router;

