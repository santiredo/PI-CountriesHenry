const postActivity = require('../controllers/postActivity')


const postActivityHandler = async(req, res) => {

    try {

        const {id} = req.params

        const {name, difficulty, duration, season, Countries} = req.body

        const activity = await postActivity(name, difficulty, duration, season, Countries, id)

        res.status(200).json(activity)
        
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}

module.exports = postActivityHandler