const getActivities = require('../controllers/getActivities')


const getActivitiesHandler = async(req, res) => {

    try {
        const activities = await getActivities()

        res.status(200).json(activities)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = getActivitiesHandler