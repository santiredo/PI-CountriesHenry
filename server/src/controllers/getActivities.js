const {Activity, Country} = require('../db')


const getActivities = async() => {

    let activities = await Activity.findAll({
        include: {
            model: Country,
            through: {
                attributes: []
            }
        }
    })

    console.log(activities)

    return activities.map(activity => {
        return {
            ...activity.toJSON(),
            Countries: activity.Countries.map(country => country.name)
        }
    })

}

module.exports = getActivities