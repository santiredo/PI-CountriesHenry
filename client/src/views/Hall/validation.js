export const validateRegister = ({username, email, password, repeatedPassword}) => {

    let errors = {
        error: false,
        username: false,
        email: '',
        password: '',
        repeatedPassword: ''
    }

    const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if(!username || username.length < 5){
        errors.error = true,
        errors.username = true
    }
    if(!emailRegex.test(email) || !email){
        errors.error = true,
        errors.email = 'Write a valid email'
    }
    if(!password){
        errors.error = true,
        errors.password = 'Fill this field'
    }
    if(password !== repeatedPassword){
        errors.error = true,
        errors.repeatedPassword = 'Both passwords must match'
    }

    return errors
}

export const validateLogin = ({email, password}) => {
    
    let errors = {
        error: false,
        email: '',
        password: ''
    }
    
    const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    (!email || !emailRegex.test(email)) && (errors.error = true, errors.email = 'Write a valid email')
    !password && (errors.error = true, errors.password = 'Fill this field')

    return errors
}