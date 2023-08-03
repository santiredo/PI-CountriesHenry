const { Router } = require("express");

const getCountriesHandler = require('../handlers/getCountriesHandler');
const getByIdHandler = require('../handlers/getByIdHandler')

const router = Router();

router.get('/countries', getCountriesHandler)
router.get('/countries/:id', getByIdHandler)
router.get('/countrie')
router.post('/activities')
router.get('/activities')

module.exports = router;
