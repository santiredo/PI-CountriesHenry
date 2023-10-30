const postUser = require('../controllers/postUserController')


const postUserHandler = async(req, res) => {

    try {


        const {username, email, password} = req.body


        const newUser = await postUser(username, email, password)

        res.status(200).json(newUser)
        
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = postUserHandler