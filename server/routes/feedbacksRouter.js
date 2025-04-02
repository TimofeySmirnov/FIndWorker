const Router = require('express');
const authMiddleware = require('../middleWare/authMiddleware');
const feedbackController = require("../controllers/feedbackControllet");
const router = Router();


router.get('/:id', feedbackController.getAllByIdEmployee);
router.post('/:id', authMiddleware(['USER']), feedbackController.createFeedback);
router.put('/:id', authMiddleware(['USER']), feedbackController.updateFeedback);
router.delete('/:id', authMiddleware(['USER']), feedbackController.deleteFeedback);

module.exports = router;