const { Router } = require("express");

const getCountriesHandler = require('../handlers/getCountriesHandler')

const router = Router();

router.get('/countries', getCountriesHandler)
router.get('/countries/:id')
router.get('/countrie')
router.post('/activities')
router.get('/activities')

module.exports = router;
