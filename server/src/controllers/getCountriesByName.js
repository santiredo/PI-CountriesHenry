const getCountries = require('./getCountries')


const getCountriesByName = async(name) => {

    let countries = await getCountries()

    console.log(countries)

    countries = countries.filter(country => {
        return country.name.toLowerCase().includes(name.toLowerCase())
    })

    return countries
}

module.exports = getCountriesByName