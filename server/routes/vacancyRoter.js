const Router = require('express')
const VacancyController = require('../controllers/vacancyController')
const authMiddleware = require('../middleWare/authMiddleware')


const router = new Router()
router.get('/my-vacancies', authMiddleware(['EMPLOYEE']), VacancyController.getMyVacancies)
router.get('/', VacancyController.getAll)
router.get('/popular' , VacancyController.getTopVacancies)
router.get('/:id' , VacancyController.getById)



router.post('/',authMiddleware(['EMPLOYEE',]), VacancyController.createVacancy)


router.put('/change-status/:id', authMiddleware(['EMPLOYEE']), VacancyController.changeStatus)
router.put('/:id', authMiddleware(['EMPLOYEE']), VacancyController.update)


router.delete('/:id', authMiddleware(['EMPLOYEE']), VacancyController.delete)

module.exports = router