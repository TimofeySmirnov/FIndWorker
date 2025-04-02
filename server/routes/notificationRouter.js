const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middleWare/authMiddleware');
const Router = require('express')
const router = new Router()

router.get('/applicant', authMiddleware(['USER']), notificationController.getApplicantNotifications)
router.get('/employee', authMiddleware(['EMPLOYEE']), notificationController.getAEmployeeNotifications)


module.exports = router;