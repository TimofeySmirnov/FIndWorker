const Router = require('express')
const router = new Router()
const adminController = require('../controllers/adminController')
const authMiddleware = require('../middleWare/authMiddleware')



router.post('/login', adminController.login)
router.post('/create', adminController.createAdmin)
router.post('/checkJwt', adminController.checkJwtAdmin)

router.get('/applicants',authMiddleware(['ADMIN']), adminController.getAllApplicants)
router.get('/employees',authMiddleware(['ADMIN']), adminController.getAllEmployees)
router.get('/recalls/:id',authMiddleware(['ADMIN']), adminController.getAllRecallsById)
router.get('/feedbacks/:id',authMiddleware(['ADMIN']), adminController.getAllFeedbacksById)
router.get('/moderationVacancies',authMiddleware(['ADMIN']), adminController.getModerationVacancies)



router.delete('/applicant/:id',authMiddleware(['ADMIN']), adminController.deleteApplicant)
router.delete('/employee/:id',authMiddleware(['ADMIN']), adminController.deleteEmployee)
router.delete('/vacancy/:id',authMiddleware(['ADMIN']), adminController.deleteVacancy)
router.delete('/resume/:id',authMiddleware(['ADMIN']), adminController.deleteResume)
router.delete('/recall/:id',authMiddleware(['ADMIN']), adminController.deleteRecall)
router.delete('/feedback/:id',authMiddleware(['ADMIN']), adminController.deleteFeedback)




router.put('/approve-vacancy/:id',authMiddleware(['ADMIN']), adminController.approveVacancy)
router.put('/reject-vacancy/:id',authMiddleware(['ADMIN']), adminController.rejectVacancy)

//filters

router.post('/busyness',authMiddleware(['ADMIN']), adminController.createBusyness)
router.post('/currencies',authMiddleware(['ADMIN']), adminController.createCurrency)
router.post('/work-experience',authMiddleware(['ADMIN']), adminController.createWorkExperience)
router.post('/work-format',authMiddleware(['ADMIN']), adminController.createWorkFormat)
router.post('/position',authMiddleware(['ADMIN']), adminController.createPosition)

router.put('/busyness/:id',authMiddleware(['ADMIN']), adminController.updateBusyness)
router.put('/currencies/:id',authMiddleware(['ADMIN']), adminController.updateCurrency)
router.put('/work-experience/:id',authMiddleware(['ADMIN']), adminController.updateWorkExp)
router.put('/work-format/:id',authMiddleware(['ADMIN']), adminController.updateWorkFormat)
router.put('/position/:id',authMiddleware(['ADMIN']), adminController.updatePosition)

router.delete('/busyness/:id',authMiddleware(['ADMIN']), adminController.deleteBusyness)
router.delete('/currencies/:id',authMiddleware(['ADMIN']), adminController.deleteCurrency)
router.delete('/work-experience/:id',authMiddleware(['ADMIN']), adminController.deleteWorkExp)
router.delete('/work-format/:id',authMiddleware(['ADMIN']), adminController.deleteWorkFormat)
router.delete('/position/:id',authMiddleware(['ADMIN']), adminController.deletePosition)

module.exports = router