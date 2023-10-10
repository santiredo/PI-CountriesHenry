const { Router } = require("express");

const getCountriesHandler = require('../handlers/getCountriesHandler');
const getByIdHandler = require('../handlers/getByIdHandler');
const getByNameHandler = require("../handlers/getByNameHandler");
const postActivityHandler = require("../handlers/postActivityHandler");
const getActivitiesHandler = require("../handlers/getActivitiesHandler");
const deleteActivity = require("../handlers/deleteActivityHandler");
const postUserHandler = require("../handlers/postUserHandler");
const getByEmailHandler = require("../handlers/getByEmailHandler");

const router = Router();

router.get('/countries', getCountriesHandler)
router.get('/countries/:id', getByIdHandler)
router.get('/country', getByNameHandler)
router.post('/activities/:id', postActivityHandler)
router.get('/activities/:id', getActivitiesHandler)
router.delete('/activities/:id', deleteActivity)
router.post('/user', postUserHandler)
router.get('/user', getByEmailHandler)

module.exports = router;
