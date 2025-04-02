const Router = require('express')
const ApplicantController = require('../controllers/applicantController')
const authMiddleware = require('../middleWare/authMiddleware')
const adminController = require("../controllers/adminController");
const router = new Router()

router.post('/registration', ApplicantController.registration);
router.post('/login', ApplicantController.login);
router.get('/me', authMiddleware(['USER']), ApplicantController.getMe)
router.post('/checkJwt', ApplicantController.checkJwtApplicant)
router.get('/:id', authMiddleware(['EMPLOYEE', 'ADMIN']), ApplicantController.getById)

router.put('/change-password',authMiddleware(['USER']), ApplicantController.changePassword)
router.put('/change-email',authMiddleware(['USER']), ApplicantController.changeEmail)

router.put('/', authMiddleware(['USER']), ApplicantController.update)

module.exports = router