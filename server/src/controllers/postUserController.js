const { User } = require("../db")
const axios = require('axios')
require("dotenv").config();


const postUser = async(username, email, password) => {

    try {

        console.log(username, email, password)

        const {MAIL_KEY} = process.env;

        if(!username || !email || !password){
            throw new Error('Some data is missing')
        }

        const doesEmailExist = await axios(`http://apilayer.net/api/check?access_key=${MAIL_KEY}&email=${email}`)


        if(doesEmailExist.data.mx_found) {
            const userEmail = await User.findOne({
                where:{
                    email,
                }
            })

            console.log(userEmail)

            if(userEmail) throw new Error('This email is already in use')

            const userName = await User.findOne({
                where:{
                    name: username
                }
            })

            if(userName) throw new Error('This username is already in use')

            const newUser = await User.create({
                name: username,
                email: email,
                password: password
            })

            return newUser
        } else {
            throw new Error('The email you provide does not exist')
        }

    } catch (error) {
        throw error
    }

}

module.exports = postUser