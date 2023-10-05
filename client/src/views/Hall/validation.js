export const validateRegister = ({username, email, password, repeatedPassword}) => {

    const errors = false

    if(password !== repeatedPassword){
        errors = true
    }

    return errors
}