const getCountryById = require('../controllers/getCountryById')


const getByIdHandler = async(req, res) => {

    try {
        
        const {id} = req.params;

        const country = await getCountryById(id)

        res.status(200).json(country)

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = getByIdHandler