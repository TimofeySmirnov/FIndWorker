const Router = require('express');
const authMiddleware = require('../middleWare/authMiddleware');
const RecallController = require('../Controllers/recallConroller');
const router = new Router();


router.get('/recallsApplicants/:id', authMiddleware(['EMPLOYEE']), RecallController.getAllRecallsByVacancy);
router.get('/my-recalls', authMiddleware(['USER']), RecallController.getMyRecalls);

router.post('/apply/:id', authMiddleware(['USER']), RecallController.applyVacancy)

router.put('/allow-recall/:id', authMiddleware(['EMPLOYEE']), RecallController.approveRecall);
router.put('/reject-recall/:id', authMiddleware(['EMPLOYEE']), RecallController.rejectRecall);


module.exports = router;