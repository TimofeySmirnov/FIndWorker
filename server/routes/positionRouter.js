const Router = require('express')
const router = new Router()
const positionConctroller = require('../controllers/positionController')

router.get('/', positionConctroller.getAllPositions)
router.get('/popular', positionConctroller.getTopPosition)
router.get('/:id', positionConctroller.getById)

module.exports = router