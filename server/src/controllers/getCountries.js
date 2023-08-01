const axios = require('axios')
const { Country } = require('../db')

const URL = `http://localhost:5000/countries`


const getCountries = async() => {
    const response = await axios(URL)

    const allCountries = response.data

    for (const country of allCountries) {

        console.log(country.cca3)
        console.log(country.name.official)
/*         console.log(country.flags.png)
        console.log(country.region)
        console.log(country.capital)
        console.log(country.subregion)
        console.log(country.area)
        console.log(country.population) */

        if(!country.capital){
            country.capital = ['-']
        }
        if(!country.subregion){
            country.subregion = '-'
        }

        await Country.create({
          id: country.cca3,
          name: country.name.official,
          image: country.flags.png,
          continent: country.region,
          capital: country.capital[0],
          subregion: country.subregion ? country.subregion : '-',
          area: country.area,
          population: country.population,
        });
    }


    return allCountries
}

module.exports = getCountries