const getUserByEmail = require("../controllers/getByEmailController")

const getByEmailHandler = async(req, res) => {

    try {

        const {email} = req.query

        const user = await getUserByEmail(email)

        res.status(200).json(user)
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = getByEmailHandler