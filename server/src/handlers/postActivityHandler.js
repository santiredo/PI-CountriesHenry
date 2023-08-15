const postActivity = require('../controllers/postActivity')


const postActivityHandler = async(req, res) => {

    try {

        const {name, difficulty, duration, season, Countries} = req.body

        const activity = await postActivity(name, difficulty, duration, season, Countries)

        res.status(200).json(activity)
        
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}

module.exports = postActivityHandler