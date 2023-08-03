const { Router } = require("express");

const getCountriesHandler = require('../handlers/getCountriesHandler');
const getByIdHandler = require('../handlers/getByIdHandler');
const getByNameHandler = require("../handlers/getByNameHandler");

const router = Router();

router.get('/countries', getCountriesHandler)
router.get('/countries/:id', getByIdHandler)
router.get('/country', getByNameHandler)
router.post('/activities')
router.get('/activities')

module.exports = router;
