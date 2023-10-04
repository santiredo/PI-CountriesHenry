import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gapi } from 'gapi-script'
import GoogleLogin from 'react-google-login'
import style from './hall.module.css';

export default function Hall () {

    const clientID = '295685867400-74qe6ef395rqe5f6nbnlse6dkq505qmv.apps.googleusercontent.com'

    const [userData, setUserData] = useState({})

    const navigate = useNavigate()

    const onSuccess = async(response) => {
        setUserData(response.profileObj)
        navigate('/home')
    }

    const onFailure = (response) => {
        console.log(response)
    }

    useEffect(() => {
        const start = () => {
            gapi.auth2.init({
                clientId: clientID
            })
        }

        gapi.load('client:auth2', start)
    }, [])

    // AQUI MANEJAMOS LA DATA DE LOGIN

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })

    const loginChange = (event) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        })
    }

    //AQUI MANEJAMOS LA DATA DEL REGISTER

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

    // Aca manejamos los estilos de los formularios

    const [login, setLogin] = useState(true)

    const handleLogin = () =>{
        setLogin(true)
    }

    const handleRegister = () => {
        setLogin(false)
    }
  
    return (
      <div className={style.hallPage}>
        <div className={style.formTitle}>
            <h1 onClick={handleLogin} className={login ? style.titleActive : style.inactiveTitle}>Log in</h1>
            <h2>|</h2>
            <h1 onClick={handleRegister} className={!login ? style.titleActive : style.inactiveTitle}>Register</h1>
        </div>
        <div className={style.bothLoginRegister}>
            <div className={login ? style.loginDiv : style.hiddenDiv}>
                <form className={style.loginForm}>
                    <input type="text" name="username" value={loginData.username} onChange={loginChange} placeholder='Username'/>
                    <input type="password" name="password" value={loginData.password} onChange={loginChange} placeholder='Password'/>
                    <button className={style.submit}> Submit </button>
                </form>
                <h4>----- Or -----</h4>
                <GoogleLogin
                    className={style.googleLogin}
                    clientId={clientID}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={`single_host_policy`}
                />
            </div>
            <div className={!login ? style.registerDiv : style.hiddenDiv}>
                <form className={style.registerForm}>
                    <input type="text" name="username" value={registerData.username} onChange={registerChange} placeholder='Username'/>
                    <input type="password" name="password" value={registerData.password} onChange={registerChange} placeholder='Password'/>
                    <input type="password" name="repeatedPassword" value={registerData.repeatedPassword} onChange={registerChange} placeholder='Repeat password'/>
                    <button className={style.submit}> Submit </button>
                </form>
                <h4>----- Or -----</h4>
                <GoogleLogin
                    className={style.googleRegister}
                    clientId={clientID}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={`single_host_policy`}
                />
            </div>
        </div>
      </div>
    );
};
