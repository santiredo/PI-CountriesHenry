

import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries, orderByRegion, orderCountries } from '../../redux/action';
import reset from '../../assets/reset.png'
import style from './filters.module.css'

export default function Filters() {

    const dispatch = useDispatch()

    const resetCountriesHandler = () => {
        dispatch(getAllCountries())
    }

    const handleOrder = (event) => {
        dispatch(orderCountries(event.target.getAttribute('value')))
    }

    const handleRegion = (event) => {
        dispatch(orderByRegion(event.target.getAttribute('value')))
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
                    <p onClick={handleRegion} value='Antarctica'>Antarctica</p>
                    <p onClick={handleRegion} value='Asia'>Asia</p>
                    <p onClick={handleRegion} value='Europe'>Europe</p>
                    <p onClick={handleRegion} value='Oceania'>Oceania</p>
                </div>
            </div>
            <div className={style.options}>
                <div className={style.divOverflow}>
                    <p>Snowboard</p>
                    <p>Ski</p>
                    <p>Trekking</p>
                    <p>Parachuting</p>
                    <p>Climbing</p>
                </div>
            </div>
        </div>
    )
}