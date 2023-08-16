

import { useDispatch, useSelector } from 'react-redux';
import { getActivities, getAllCountries, orderByActivity, orderByRegion, orderCountries } from '../../redux/action';
import reset from '../../assets/reset.png'
import style from './filters.module.css'
import { useEffect } from 'react';

export default function Filters() {

    const dispatch = useDispatch()

    const activities = useSelector(state => state.activities)
    const countries = useSelector(state=> state.renderedCountries)

    useEffect( ()=> {
        dispatch(getActivities())
    },[])

    const resetCountriesHandler = () => {
        dispatch(getAllCountries())
    }

    const handleOrder = (event) => {
        dispatch(orderCountries(event.target.getAttribute('value')))
    }

    const handleRegion = (event) => {
        dispatch(orderByRegion(event.target.getAttribute('value')))
    }

    const handleActivity = (event) => {
        dispatch(orderByActivity(event.target.getAttribute('value')))

        console.log(countries)
    }

    return (
        <div className={style.allFilters}>
            <h3>Filters</h3>
            <img onClick={resetCountriesHandler} src={reset} alt="" />
            <div className={style.options}>
                <p onClick={handleOrder} value='AZ'>A - Z</p>
                <p onClick={handleOrder} value='ZA'>Z - A</p>
            </div>
            <div className={style.options}>
                <p onClick={handleOrder} value='+'>+ 🕴🏿 +</p>
                <p onClick={handleOrder} value='-'>- 🕴🏿 -</p>
            </div>
            <div className={style.options}>
                <div className={style.divOverflow}>
                    <p onClick={handleRegion} value='Africa'>Africa</p>
                    <p onClick={handleRegion} value='Americas'>Americas</p>
                    <p onClick={handleRegion} value='Antarctic'>Antarctic</p>
                    <p onClick={handleRegion} value='Asia'>Asia</p>
                    <p onClick={handleRegion} value='Europe'>Europe</p>
                    <p onClick={handleRegion} value='Oceania'>Oceania</p>
                </div>
            </div>
            <div className={style.options}>
                <div className={style.divOverflow}>
                    {
                        activities?.map(activity => {
                            return (
                                <p key={activity.id} onClick={handleActivity} value={`${activity.name}`}>{activity.name}</p>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}