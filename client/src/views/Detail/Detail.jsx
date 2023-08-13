import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { showDetails } from "../../redux/action"
import loadingGif from '../../assets/loadingGif.gif'
import style from './detail.module.css'



export default function Detail() {

    const {id} = useParams()
    const details = useSelector(state => state.countryDetails)
    const dispatch = useDispatch()
    const loading = useSelector(state => state.loadingDetails)

    useEffect(() => {
        dispatch(showDetails(id))

    }, [dispatch])

    return (
        <div className={style.detailPage}>
            <img className={style.backgroundImage} src={details.image} alt="" />
            {
                loading
                ?   <img src={loadingGif} alt="" />
                :   <div className={style.detailsDiv}>
                        <h1>{details.name}</h1>
                        <img src={details.image} alt="" />
                        <div className={style.infoContainer}>
                            <div>
                                <h2>Id: {details.id}</h2>
                                <h2>Region: {details.continent}</h2>
                                <h2>Population: {details.population}🚶🏾‍♂️</h2>
                                <h2>Capital: {details.capital}</h2>
                                <h2>Subregion: {details.subregion}</h2>
                                <h2>Area: {details.area}km²</h2>                                    
                            </div>
                        </div>
                        <div className={style.detailsBackground}></div>                        
                    </div>
            }
            

        </div>
    )
}