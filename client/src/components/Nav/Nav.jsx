
import {NavLink} from 'react-router-dom';
import home from '../../assets/home.png'
import create from '../../assets/create.png'
import activities from '../../assets/activities.png'
import style from './nav.module.css'


export default function() {

    return (
        <div className={style.nav}>
            <NavLink to={`/home`}><img src={home} alt="" /><p>Home</p></NavLink>
            <NavLink to={'/activities'}><img src={activities} alt="" /><p>Activities</p></NavLink>
            <NavLink to={`/form`}><img src={create} alt="" /><p>Create</p></NavLink>
        </div>
    )
}