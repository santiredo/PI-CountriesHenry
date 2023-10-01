import { useDispatch, useSelector } from 'react-redux';
import { getActivities, getAllCountries, orderByActivity, orderByRegion, orderCountries } from '../../redux/action';
import reset from '../../assets/reset.png'
import style from './filters.module.css'
import { useEffect, useState } from 'react';

export default function Filters() {

    const dispatch = useDispatch()

    const activities = useSelector(state => state.activities)

    const [filters, setFilters] = useState({
        order: null,
        region: null,
        activity: null
    })

    useEffect( ()=> {
        dispatch(getActivities())
    },[])

    const resetCountriesHandler = () => {
        dispatch(getAllCountries())
        setFilters({
            order: null,
            region: null,
            activity: null
        })
    }

    const handleOrder = (event) => {

        dispatch(orderCountries(event.target.getAttribute('value')))

        const value = event.target.getAttribute('value')

        setFilters({
            ...filters,
            order: value
        })

    }

    const handleRegion = (event) => {

        dispatch(orderByRegion(event.target.getAttribute('value')))

        const value = event.target.getAttribute('value')

        setFilters({...filters, region: value})
    }

    const handleActivity = (event) => {

        dispatch(orderByActivity(event.target.getAttribute('value')))

        const value = event.target.getAttribute('value')

        setFilters({...filters, activity: value})
    }

    return (
        <div className={style.allFilters}>
            <h3>Filters</h3>
            <img onClick={resetCountriesHandler} src={reset} alt="" />
            <div className={style.options}>
                <p onClick={handleOrder} value='AZ'>
                    A - Z
                    {filters.order === 'AZ' && <span className={style.activeFilter}></span>}
                </p>
                <p onClick={handleOrder} value='ZA'>
                    Z - A
                    {filters.order === 'ZA' && <span className={style.activeFilter}></span>}
                </p>
            </div>
            <div className={style.options}>
                <p onClick={handleOrder} value='+'>
                    + 🕴🏿 +
                    {filters.order === '+' && <span className={style.activeFilter}></span>}
                </p>
                <p onClick={handleOrder} value='-'>
                    - 🕴🏿 -
                    {filters.order === '-' && <span className={style.activeFilter}></span>}
                </p>
            </div>
            <div className={style.options}>
                <div className={style.divOverflow}>
                    <p onClick={handleRegion} value='Africa'>
                        Africa
                        {filters.region === 'Africa' && <span className={style.activeFilter}></span>}
                    </p>
                    <p onClick={handleRegion} value='Americas'>
                        Americas
                        {filters.region === 'Americas' && <span className={style.activeFilter}></span>}
                    </p>
                    <p onClick={handleRegion} value='Antartic'>
                        Antartic
                        {filters.region === 'Antartic' && <span className={style.activeFilter}></span>}
                    </p>
                    <p onClick={handleRegion} value='Asia'>
                        Asia
                        {filters.region === 'Asia' && <span className={style.activeFilter}></span>}
                    </p>
                    <p onClick={handleRegion} value='Europe'>
                        Europe
                        {filters.region === 'Europe' && <span className={style.activeFilter}></span>}
                    </p>
                    <p onClick={handleRegion} value='Oceania'>
                        Oceania
                        {filters.region === 'Oceania' && <span className={style.activeFilter}></span>}
                    </p>
                </div>
            </div>
            <div className={style.options}>
                <div className={style.divOverflow}>
                    {
                        activities?.map(activity => {
                            return (
                                <p key={activity.id} onClick={handleActivity} value={`${activity.name}`}>
                                    {activity.name}
                                    {filters.activity === activity.name && <span className={style.activeFilter}></span>}
                                </p>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}