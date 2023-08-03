const getCountries = require('./getCountries')


const getCountriesByName = async(name) => {

    let countries = await getCountries()

    countries = countries.filter(country => {
        return country.name.official.toLowerCase().includes(name.toLowerCase())
    })

    return countries
}

module.exports = getCountriesByName