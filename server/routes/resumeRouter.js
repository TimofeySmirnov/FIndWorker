const Router = require('express')
const authMiddleware = require('../middleWare/authMiddleware')
const ResumeController = require('../controllers/resumeController')

const router = new Router()

router.get('/my-resumes',authMiddleware(['USER']), ResumeController.getMyResumes)
router.get('/:id', authMiddleware(['USER','EMPLOYEE']), ResumeController.getById)
router.post('/', authMiddleware(['USER']), ResumeController.create)
router.put('/:id', authMiddleware(['USER']), ResumeController.update)
router.delete('/:id',authMiddleware(['USER']), ResumeController.delete)

module.exports = router