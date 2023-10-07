export const validateRegister = ({username, email, password, repeatedPassword}) => {

    let errors = false

    if(password !== repeatedPassword){
        errors = true
    }

    return errors
}

export const validateLogin = ({email, password}) => {
    let errors = false

    !email && (errors = true)
    !password && (errors = true)

    return errors
}