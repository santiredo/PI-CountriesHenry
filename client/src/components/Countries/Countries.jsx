import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries } from "../../redux/action";

import loadingGif from '../../assets/loadingGif.gif'
import style from './countries.module.css'
import Country from "../Country/Country";


export default function Countries() {


    const dispatch = useDispatch()
    const countries = useSelector(state => state.renderedCountries)
    const loading = useSelector(state => state.loading)

    const countriesPerPage = 10;
    const currentPage = useSelector(state => state.currentPage);
    const firstIndexCountry = (currentPage - 1) * countriesPerPage;
    const lastIndexCountry = firstIndexCountry + countriesPerPage;
    const renderedCountries = countries.slice(firstIndexCountry, lastIndexCountry)

    useEffect(() => {
        dispatch(getAllCountries())
    }, [dispatch])


    return (
        <div className={style.countriesSection}>
            <h1>Countries from all over the world</h1>
            {
                loading 
                ? (
                    <img className={style.loadingGif} src={loadingGif} alt="" />
                )
                : (
                    <div className={style.pagination}>
                        {
                            renderedCountries.map(country => (
                                <Country
                                    id={country.id}
                                    key={country.id}
                                    name={country.name}
                                    image={country.image}
                                    continent={country.continent}
                                />
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}