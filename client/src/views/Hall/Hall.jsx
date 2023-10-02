import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script'
import GoogleLogin from 'react-google-login'
import style from './hall.module.css';

export default function Hall () {

    const clientID = '295685867400-74qe6ef395rqe5f6nbnlse6dkq505qmv.apps.googleusercontent.com'

    useEffect(() => {
        const start = () => {
            gapi.auth2.init({
                clientId: clientID
            })
        }

        gapi.load('client:auth2', start)
    }, [])

    const [form, setForm] = useState({
        username: '',
        email: ''
    })

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

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
        {
            login ? (
                <form className={style.registerForm}>
                    <div className={style.formDiv}>
                        <div className={style.label}>
                            <label>Username:</label>
                        </div>
                        <input type="text" name="username" id="username" value={form.username} onChange={handleChange}/>
                    </div>
                    <div className={style.formDiv}>
                        <div className={style.label}>
                            <label>Email:</label>
                        </div>
                        <input type="text" name="email" id="email" />
                    </div>
                </form>
            ) : (
                <form className={style.registerForm}>
                    <div className={style.formDiv}>
                        <div className={style.label}>
                            <label>Username:</label>
                        </div>
                        <input type="text" name="username" id="username" value={form.username} onChange={handleChange}/>
                    </div>
                    <div className={style.formDiv}>
                        <div className={style.label}>
                            <label>Email:</label>
                        </div>
                        <input type="text" name="email" id="email" />
                    </div>
                </form>
            )
        }
      </div>
    );
};
