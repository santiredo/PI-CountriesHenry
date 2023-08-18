import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries, setPage } from "../../redux/action";

import loadingGif from '../../assets/loadingGif.gif'
import style from './countries.module.css'
import Country from "../Country/Country";


export default function Countries() {


    const dispatch = useDispatch()
    const countries = useSelector(state => state.renderedCountries)
    const loading = useSelector(state => state.loadingHome)

    const countriesPerPage = 10;
    const currentPage = useSelector(state => state.currentPage);
    const firstIndexCountry = (currentPage - 1) * countriesPerPage;
    const lastIndexCountry = firstIndexCountry + countriesPerPage;
    const renderedCountries = countries.slice(firstIndexCountry, lastIndexCountry);
    const lastPage = Math.ceil(countries.length / 10)

    const handlerPagination = (direction, event) => {

        if((direction === -1 || (countriesPerPage * currentPage) < countries.length) && (currentPage + direction > 0)){
            const newPage = currentPage + direction
            dispatch(setPage(newPage))
        }
    }

    useEffect(() => {
        dispatch(getAllCountries())
    }, [])

    return (
        <div className={style.countriesSection}>
            <h1>Countries from all over the world</h1>
            {
                loading 
                ? (
                    <img className={style.loadingGif} src={loadingGif} alt="" />
                )
                : (
                    <div className={style.countriesDiv}>
                        <div className={style.pagination}>
                            <button onClick={(event) => handlerPagination(-1, event)} className={style.paginationButton}>Prev</button>
                            <div>
                                <p>{ currentPage - 3 > 0 && `${currentPage - 3}`}</p>
                                <p>{ currentPage - 2 > 0 && `${currentPage - 2}`}</p>
                                <p>{ currentPage - 1 > 0 && `${currentPage - 1}`}</p>
                                <p className={style.currentPage}>{currentPage}</p>
                                <p>{currentPage + 1 <= lastPage && `${currentPage + 1}`}</p>
                                <p>{currentPage + 2 <= lastPage && `${currentPage + 2}`}</p>
                                <p>{currentPage + 3 <= lastPage && `${currentPage + 3}`}</p>
                            </div>

                            <button onClick={(event) => handlerPagination(1, event)} className={style.paginationButton}>Next</button>
                        </div>
                        <div className={style.divCountries}>
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
                    </div>
                )
            }
        </div>
    )
}