const postUser = require('../controllers/postUserController')


const postUserHandler = async(req, res) => {

    try {

        const {name, email} = req.body

        const user = await postUser(name, email)

        res.status(200).json(user)
        
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}

module.exports = postUserHandler