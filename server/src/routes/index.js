const { Router } = require("express");

const getCountriesHandler = require('../handlers/getCountriesHandler');
const getByIdHandler = require('../handlers/getByIdHandler');
const getByNameHandler = require("../handlers/getByNameHandler");
const postActivityHandler = require("../handlers/postActivityHandler");
const getActivitiesHandler = require("../handlers/getActivitiesHandler");

const router = Router();

router.get('/countries', getCountriesHandler)
router.get('/countries/:id', getByIdHandler)
router.get('/country', getByNameHandler)
router.post('/activities', postActivityHandler)
router.get('/activities', getActivitiesHandler)

module.exports = router;
