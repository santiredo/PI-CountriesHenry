const { User } = require("../db")
const axios = require('axios')
require("dotenv").config();


const postUser = async(username, email, password) => {

    try {

        const {MAIL_KEY} = process.env;

        if(!username || !email || !password){
            throw new Error('Some data is missing')
        }


        const doesEmailExist = await axios(`https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${MAIL_KEY}`)


        if(doesEmailExist.data.data.status === 'valid') {
            const userEmail = await User.findOne({
                where:{
                    email,
                }
            })

            if(userEmail) return 'This email is already in use, try using another one'

            const userName = await User.findOne({
                where:{
                    name: username
                }
            })

            if(userName) return 'This username is already in use, try using another one'

            const newUser = await User.create({
                name: username,
                email: email,
                password: password
            })

            return newUser
        } else {
            return `${email} does not exist`
        }

    } catch (error) {
        throw error
    }

}

module.exports = postUser