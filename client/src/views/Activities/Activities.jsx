import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { deleteActivity, getActivities } from "../../redux/action"
import Nav from "../../components/Nav/Nav"
import bin from '../../assets/delete.png'
import style from './activities.module.css'


export default function() {

    const activities = useSelector(state => state.activities)
    const dispatch = useDispatch()
    const loading = useSelector(state => state.loadingActivities)



    useEffect( () => {
        dispatch(getActivities(JSON.parse(localStorage.getItem('userData')).id))

    },[dispatch])

    const handleDelete = (id) => {

        dispatch(deleteActivity(id))

    }

    return (
        <div className={style.activitiesPage}>
            <div className={style.nav}>
                <Nav/> 
            </div>
            {
                loading
                ? (
                    <></>
                )
                : (
                    <div className={style.activitiesDiv}>
                        {
                            activities?.map(activity => (
                                <div className={style.activityDiv} key={activity.id}>
                                    <h1>{activity.name}</h1>
                                    <div className={style.activityInfo}>
                                        <p>Difficulty: <b>{activity.difficulty} (max 5)</b></p>
                                        <p>Duration: <b>{activity.duration}hs</b></p>
                                        <p>Recommended season: <b>{activity.season}</b></p>
                                        <div className={style.activityCountries}>
                                            <p>Countries:</p>
                                            <p className={style.countries}>
                                                {
                                                    activity.Countries.map(country => (
                                                        activity.Countries[activity.Countries.length-1] !== country
                                                        ? <b key={`${activity.id}-${country}`}> {country},</b>
                                                        : <b key={`${activity.id}-${country}`}> {country}</b>
                                                    ))
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <img onClick={() => handleDelete(activity.id)} className={style.deleteBin} src={bin} alt="" />
                                </div>
                            ))
                        }
                    </div>                    
                )
            }

        </div>
    )
} 