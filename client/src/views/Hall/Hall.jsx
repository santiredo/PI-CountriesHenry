import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { validateLogin, validateRegister } from './validation';
import loadingGif from '../../assets/loadingGif.gif'
import Swal from 'sweetalert2';
import googleIcon from '../../assets/googleIcon.png'
import style from './hall.module.css';

// IMPLEMENTACION DE SDK DE FIREBASE

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPl-9m6Fdobc-RkdWx_LG6aC5UAvztaj0",
  authDomain: "countriespi-73b0d.firebaseapp.com",
  projectId: "countriespi-73b0d",
  storageBucket: "countriespi-73b0d.appspot.com",
  messagingSenderId: "42139559444",
  appId: "1:42139559444:web:42ca999d6c666353ede901"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()


export default function Hall () {

    const clientID = '67896451421-l9ud55ojq6grrvkel9sav36dqe4kb85k.apps.googleusercontent.com'

    const navigate = useNavigate()


    // ACA CREAMOS EL USUARIO EN LA BASE DE DATOS

    const registerUser = async(username, email, password) => {

        setLoading(true)
        try {
            const newUser = await axios.post(`https://pi-countrieshenry-production.up.railway.app/user`, {username, email, password})

            typeof newUser.data !== 'string' ? (
                localStorage.setItem('userData', JSON.stringify({id:newUser.data.id, email:email, username: username})),
                setLoading(false),
                Swal.fire(`Congratulations ${username}`, `Continue to see the prject`),
                navigate(`/home`)
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
                const logedUser = await axios(`https://pi-countrieshenry-production.up.railway.app/user?email=${email}`)

                !logedUser.data
                ? (
                    setLoading(false),
                    Swal.fire(`Upss`, `${email} does not exist in the data base, please create an account`, `error`)
                ) : (
                    localStorage.setItem('userData', JSON.stringify({id:logedUser.data.id, email:email, username: logedUser.data.name})),
                    setLoading(false),
                    Swal.fire(`Welcome back ${logedUser.data.name}`),
                    navigate(`/home`)
                )

            } catch (error) {
                console.log(error)
            }
        } else{
            try {
                const logedUser = await axios.get(`https://pi-countrieshenry-production.up.railway.app/user?email=${email}`)

                if(logedUser.data){
                    setLoading(false)
                    logedUser.data.password === password
                    ? (
                        localStorage.setItem('userData', JSON.stringify({id:logedUser.data.id, email:email, username: logedUser.data.name})),
                        Swal.fire(`Welcome back ${logedUser.data.name}`),
                        navigate(`/home`)
                    ):(
                        Swal.fire(`Ups`, `The password didnt match the user`, 'error')
                    )
                } else{
                    setLoading(false)
                    Swal.fire(`Upss`, `${email} does not exist in the data base, please create an account`, `error`)
                }
                
            } catch (error) {
                
            }

        }
    }

    // Aqui manejamos los errores del formulario de registro

    const [registerErrors, setRegisterErrors] = useState({
        error: false,
        username: false,
        email: '',
        password: '',
        repeatedPassword: ''
    })

    const [loginErrors, setLoginErrors] = useState({
        error: false,
        email: '',
        password: ''
    })

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

    const handleLoginSubmit = async(event) => {
        event.preventDefault()

        const errors = await validateLogin(loginData)

        setLoading(true)

        setLoginErrors(validateLogin(loginData));

        (errors.error)
        ? (
            setLoading(false)
        ) : (
            loginHandler(loginData.email, loginData.password)
        )
    }

    //Aca manejamos el login con google


    const googleLogin = async() => {

        signInWithPopup(auth, provider).then((data) => {
            loginHandler(data.user.email)
        })
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

        const errors = await validateRegister(registerData)

        setLoading(true)

        setRegisterErrors(validateRegister(registerData))

        const {username, email, password} = registerData

        !errors.error ? (
            registerUser(username, email, password)
        ) : (
            setLoading(false)
        )


    }

    // Aca manejamos el registro con google

    const googleRegistration = async() => {

        signInWithPopup(auth, provider).then((data) => {
            const email = data.user.email
            const username = data.user.email.split('@')[0]
            let password = ''

            for(let i = 0; i < 10; i++){
                password += (Math.round(Math.random()*10)).toString()
            }

            console.log(username, email, password)

            registerUser(username, email, password)
        })
    }

    // Aca manejamos los estilos de los formularios

    const [loginCSS, setLoginCSS] = useState(true)

    const selectLogin = () =>{
        setRegisterErrors({
            error: false,
            username: false,
            email: '',
            password: '',
            repeatedPassword: ''
        })
        setLoginCSS(true)
    }

    const selectRegister = () => {
        setLoginErrors({
            error: false,
            email: '',
            password: ''
        })
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
                    <div>
                        {loginErrors.email && <span className={style.error}>{loginErrors.email}</span>}
                        <input type="text" name="email" value={loginData.email} onChange={loginChange} placeholder='example@whatever.com'/>
                    </div>
                    <div>
                        {loginErrors.password && <span className={style.error}>{loginErrors.password}</span>}
                        <input type="password" name="password" value={loginData.password} onChange={loginChange} placeholder='Password'/>
                    </div>
                    <button className={style.submit} onClick={handleLoginSubmit}> Submit </button>
                </form>
                <h4>----- Or -----</h4>
                <button className={style.googleAuth} onClick={googleLogin}>
                    <img src={googleIcon} alt="" />
                    Log in with Google
                </button>
            </div>
            <div className={!loginCSS ? style.registerDiv : style.hiddenDiv}>
                <form className={style.registerForm}>
                    <div>
                        <span className={registerErrors.username ? style.error : style.condition}>Min 5 characters</span>
                        <input type="text" name="username" value={registerData.username} onChange={registerChange} placeholder='Username'/>
                    </div>
                    <div>
                        {registerErrors.email && <span className={style.error}>{registerErrors.email}</span>}
                        <input type="text" name="email" value={registerData.email} onChange={registerChange} placeholder='example@whatever.com'/>
                    </div>
                    <div>
                        {registerErrors.password && <span className={style.error}>{registerErrors.password}</span>}
                        <input type="password" name="password" value={registerData.password} onChange={registerChange} placeholder='Password'/>
                    </div>
                    <div>
                        {registerErrors.repeatedPassword && <span className={style.error}>{registerErrors.repeatedPassword}</span>}
                        <input type="password" name="repeatedPassword" value={registerData.repeatedPassword} onChange={registerChange} placeholder='Repeat password'/>
                    </div>
                    <button className={style.submit} onClick={handleRegisterSubmit}> Submit </button>
                </form>
                <h4>----- Or -----</h4>
                <button className={style.googleAuth} onClick={googleRegistration}>
                    <img src={googleIcon} alt="" />
                    Sign up with Google
                </button>
            </div>
        </div>
      </div>
    );
};
