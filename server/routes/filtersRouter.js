const Router = require('express')
const router = new Router()
const FiltersController = require('../controllers/filtersController')

router.get('/busyness', FiltersController.getAllBusyness)
router.get('/currencies', FiltersController.getAllCurrencies)
router.get('/work-experiences', FiltersController.getAllWorkExperiences)
router.get('/work-formats', FiltersController.getAllWorkFormats)

module.exports = router