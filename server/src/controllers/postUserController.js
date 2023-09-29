const { User } = require("../db")


const postUser = async(name, email) => {

    try {

        if(!name || !email){
            throw new Error('Some data is missing')
        }

        const newUser = await User.findOrCreate({
            where:{
                name,
                email
            }
        })

        return newUser
        
    } catch (error) {
        throw error
    }

}

module.exports = postUser