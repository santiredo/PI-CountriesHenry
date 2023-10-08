const { Activity, Country } = require("../db")


const postActivity = async(name, difficulty, duration, season, Countries, id) => {

    try {

        if(!name || !difficulty || !duration || !season || !Countries){
            throw new Error('Some data is missing')
        }

        const newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season,
            UserId: id.toString()
        })

        for (const countryName of Countries) {

            const assignedCountry = await Country.findOne({
              where: {
                name: countryName
              }
            });
            
            await newActivity.addCountry(assignedCountry);
        }
        
        return newActivity
        
    } catch (error) {
        throw error
    }

}

module.exports = postActivity