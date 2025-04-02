const Router = require('express')
const EmployeeController = require('../controllers/employeeController')
const authMiddleware = require('../middleWare/authMiddleware')
const adminController = require("../controllers/adminController");
const router = new Router()

router.post('/registration', EmployeeController.registration);
router.post('/login', EmployeeController.login);
router.get('/', EmployeeController.getAll)
router.get('/popular', EmployeeController.getPopular)
router.post('/checkJwt', EmployeeController.checkJwtEmployee)
router.get('/:id', EmployeeController.getById)


router.put('/change-password',authMiddleware(['EMPLOYEE']), EmployeeController.changePassword)
router.put('/change-email',authMiddleware(['EMPLOYEE']), EmployeeController.changeEmail)

router.put('/', authMiddleware(['EMPLOYEE']), EmployeeController.update)
module.exports = router