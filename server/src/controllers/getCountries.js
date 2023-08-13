const axios = require('axios')
const { Country } = require('../db')
const db = require('../db')

const URL = `http://localhost:5000/countries`


const getCountries = async() => {
    const response = await axios(URL)

    const allCountries = response.data

    let dbCountries = []

    for (const country of allCountries) {

        if(!country.capital){
            country.capital = ['-']
        }
        if(!country.subregion){
            country.subregion = '-'
        }

        await Country.findOrCreate({
            where: {
                id: country.cca3,
                name: country.name.official,
                image: country.flags.png,
                continent: country.region,
                capital: country.capital[0],
                subregion: country.subregion,
                area: country.area,
                population: country.population
            }
        });

        dbCountries.push({
            id: country.cca3,
            name: country.name.official,
            image: country.flags.png,
            continent: country.region,
            capital: country.capital[0],
            subregion: country.subregion,
            area: country.area,
            population: country.population
        })
    }

    return dbCountries
}

module.exports = getCountries