import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gapi } from 'gapi-script'
import GoogleLogin from 'react-google-login'
import axios from 'axios'
import { validateLogin, validateRegister } from './validation';
import loadingGif from '../../assets/loadingGif.gif'
import Swal from 'sweetalert2';
import style from './hall.module.css';


export default function Hall () {

    const clientID = '295685867400-74qe6ef395rqe5f6nbnlse6dkq505qmv.apps.googleusercontent.com'

    const navigate = useNavigate()

    useEffect(() => {
        const start = () => {
            gapi.auth2.init({
                clientId: clientID
            })
        }

        gapi.load('client:auth2', start)
    }, [])

    // ACA CREAMOS EL USUARIO EN LA BASE DE DATOS

    const registerUser = async(username, email, password) => {

        setLoading(true)
        try {
            const newUser = await axios.post(`http://localhost:3001/user`, {username, email, password})

            typeof newUser.data !== 'string' ? (
                localStorage.setItem('userData', JSON.stringify({id:newUser.data.id, email:email, username: username})),
                setLoading(false),
                Swal.fire(`Congratulations ${username}`, `Continue to see the prject`, `success`),
                navigate('/home')
            ) : (
                setLoading(false),
                Swal.fire(`Ups`, `${newUser.data}`, `error`),
                setRegisterData({
                    username: '',
                    email: '',
                    password: '',
                    repeatedPassword: ''
                })
            )
            
        } catch (error) {
            console.log(error)
        }   
    }

    // ACA CREAMOS LA FUNCION PARA INGRESAR CON LOGIN

    const loginHandler = async(email, password) => {
        setLoading(true)
        if(!password){
            try {
                const logedUser = await axios(`http://localhost:3001/user`, {email: email})

                !logedUser
                ? Swal.fire(`Upss`, `${email} does not exist in the data base, please create an account`, `error`)
                : (
                    setLoading(false),
                    Swal.fire(`Welcome back ${logedUser.name}`, `success`),
                    navigate('/home')
                )

            } catch (error) {
                console.log(error)
            }
        } else{
            try {
                console.log(email)
                const logedUser = await axios.get(`http://localhost:3001/user?email=${email}`)

                if(!logedUser){
                    Swal.fire(`Upss`, `${email} does not exist in the data base, please create an account`, `error`)
                } else{
                    setLoading(false)
                    logedUser.data.password === password
                    ? (
                        Swal.fire(`Welcome back ${logedUser.data.name}`, `success`),
                        navigate('/home')
                    ):(
                        Swal.fire(`Ups`, `The password didnt match the user`, 'error')
                    )
                }
                
            } catch (error) {
                
            }

        }
    }

    // AQUI MANEJAMOS LA DATA DE LOGIN

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const loginChange = (event) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        })
    }   

    // Aca manejamos el submit del login

    const handleLoginSubmit = (event) => {
        event.preventDefault()

        setLoading(true)

        const errors = validateLogin(loginData)

        !errors
        ? loginHandler(loginData.email, loginData.password)
        : (
            setLoading(false),
            Swal.fire('Ups', `You must complete the form correctly`, `error`)
        )
    }

    //Aca manejamos el login con google

    const [userData, setUserData] = useState({})

    const googleLogin = async(response) => {
        setUserData(response.profileObj)

        loginHandler(response.profileObj.email)
    }

    const loginFailure = (response) => {
        console.log(response)
    }

    //AQUI MANEJAMOS LA DATA DEL REGISTRO

    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: '',
        repeatedPassword: ''
    })

    const registerChange = (event) => {
        setRegisterData({
            ...registerData,
            [event.target.name]: event.target.value
        })
    }

    // Manejamos el submit del registro

    const [loading, setLoading] = useState(false)

    const handleRegisterSubmit = async(event) => {
        event.preventDefault()

        const errors = validateRegister(registerData)

        console.log(errors)

        if(!errors) {
            const {username, email, password} = registerData
            registerUser(username, email, password)
        }
    }

    // Aca manejamos el registro con google

    const googleRegistration = async(response) => {
        setUserData(response.profileObj)

        console.log((Math.round(Math.random()*10)).toString())
        
        const email = response.profileObj.email
        const username = response.profileObj.email.split('@')[0]
        let password = ''

        for(let i = 0; i < 10; i++){
            password += (Math.round(Math.random()*10)).toString()
        }

        registerUser(username, email, password)
    }

    const registerFailure = (response) => {
        console.log(response)
    }

    // Aca manejamos los estilos de los formularios

    const [loginCSS, setLoginCSS] = useState(true)

    const selectLogin = () =>{
        setLoginCSS(true)
    }

    const selectRegister = () => {
        setLoginCSS(false)
    }
  
    return (
      <div className={style.hallPage}>
        {
            loading && (
                <div className={style.loadingDiv}>
                    <img src={loadingGif} alt="" />
                </div>
            )            
        }
        <div className={style.formTitle}>
            <h1 onClick={selectLogin} className={loginCSS ? style.titleActive : style.inactiveTitle}>Log in</h1>
            <h2>|</h2>
            <h1 onClick={selectRegister} className={!loginCSS ? style.titleActive : style.inactiveTitle}>Register</h1>
        </div>
        <div className={style.bothLoginRegister}>
            <div className={loginCSS ? style.loginDiv : style.hiddenDiv}>
                <form className={style.loginForm}>
                    <input type="text" name="email" value={loginData.email} onChange={loginChange} placeholder='example@whatever.com'/>
                    <input type="password" name="password" value={loginData.password} onChange={loginChange} placeholder='Password'/>
                    <button className={style.submit} onClick={handleLoginSubmit}> Submit </button>
                </form>
                <h4>----- Or -----</h4>
                <GoogleLogin
                    className={style.googleLogin}
                    clientId={clientID}
                    onSuccess={googleLogin}
                    onFailure={loginFailure}
                    cookiePolicy={`single_host_policy`}
                />
            </div>
            <div className={!loginCSS ? style.registerDiv : style.hiddenDiv}>
                <form className={style.registerForm}>
                    <input type="text" name="username" value={registerData.username} onChange={registerChange} placeholder='Username'/>
                    <input type="text" name="email" value={registerData.email} onChange={registerChange} placeholder='example@whatever.com'/>
                    <input type="password" name="password" value={registerData.password} onChange={registerChange} placeholder='Password'/>
                    <input type="password" name="repeatedPassword" value={registerData.repeatedPassword} onChange={registerChange} placeholder='Repeat password'/>
                    <button className={style.submit} onClick={handleRegisterSubmit}> Submit </button>
                </form>
                <h4>----- Or -----</h4>
                <GoogleLogin
                    className={style.googleRegister}
                    clientId={clientID}
                    onSuccess={googleRegistration}
                    onFailure={registerFailure}
                    cookiePolicy={`single_host_policy`}
                />
            </div>
        </div>
      </div>
    );
};
