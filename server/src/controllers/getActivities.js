const {Activity, Country} = require('../db')


const getActivities = async(id) => {

    let activities = await Activity.findAll({
        where:{
            UserId:id
        },
        include: {
            model: Country,
            through: {
                attributes: []
            }
        }
    })

    return activities.map(activity => {
        return {
            ...activity.toJSON(),
            Countries: activity.Countries.map(country => country.name)
        }
    })

}

module.exports = getActivities