const postUser = require('../controllers/postUserController')


const postUserHandler = async(req, res) => {

    try {

        const {username, email, password} = req.body

        console.log(username, email, password)

        const newUser = await postUser(username, email, password)

        res.status(200).json(newUser)
        
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}

module.exports = postUserHandler