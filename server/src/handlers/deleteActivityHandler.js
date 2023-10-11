const deleteActivityController = require('../controllers/deleteActivityController')
const getActivities = require('../controllers/getActivities')


const deleteActivity = async(req, res) => {

    try {
        const {id, UserId} = req.params

        await deleteActivityController(id, UserId)

        const activities = await getActivities(UserId)

        res.status(200).json(activities)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = deleteActivity