const axios = require('axios')
const { Country, Activity } = require('../db')

const getCountryById = async(id) => {

    const country = await Country.findByPk(id, {
        include: {
            model: Activity,
            through: {
                attributes: []
            }
        }
    })

    return country
}

module.exports = getCountryById;