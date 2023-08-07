const { Activity, Country } = require("../db")


const postActivity = async(name, difficulty, duration, season, countries) => {

    try {

        if(!name || !difficulty || !duration || !season || !countries){
            throw new Error('Some data is missing')
        }

        const assignedCountries = await Country.findAll({
            where: {
                name: countries
            }
        })

        const newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season,
            countries: assignedCountries.map(country => country.name)
        })

        return newActivity
        
    } catch (error) {
        throw error
    }

}

module.exports = postActivity