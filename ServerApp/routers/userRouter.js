const Router = require("express");
const userController = require("../controllers/userController");
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const router = new Router();

router.post('/changeUserData', upload.single('userImage'), userController.userDataChanging)
router.post('/changePassword', userController.passwordChanging)
router.post('/addNewRoleToUser', userController.addNewRoleToUser)
router.post('/removeRoleFromUser', userController.removeRoleFromUser)
router.post('/requestRoleFromAdmin', userController.requestRoleFromAdmin)
router.post('/changeUserRoleRequest', userController.changeUserRoleRequest)
router.post('/addNotification', userController.addNotification)
router.get('/getUser/:id', userController.getUserUsingId)
router.get('/getNotifications/:id', userController.getNotification)

module.exports = router;

