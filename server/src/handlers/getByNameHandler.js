const getCountriesByName = require('../controllers/getCountriesByName')


const getByNameHandler = async(req, res) => {

    try {

        const {name} = req.query

        console.log(name)

        const countries = await getCountriesByName(name)

        res.status(200).json(countries)
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = getByNameHandler