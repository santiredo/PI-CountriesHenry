const axios = require('axios')

const URL = `http://localhost:5000/countries`


const getCountries = async() => {
    const response = await axios(URL)

    const allCountries = response.data
    return allCountries
}

module.exports = getCountries