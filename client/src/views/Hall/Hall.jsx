import { useState } from 'react';
import style from './hall.module.css';

export default function Hall () {

    const [form, setForm] = useState({
        username: null,
        email: null
    })

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }
  
    return (
      <div className={style.hallPage}>
        <div className={style.divForm}>
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
                    <input type="text" name="email" id="email" value={form.email}/>
                </div>
            </form>
        </div>
      </div>
    );
};
