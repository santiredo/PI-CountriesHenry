
import Countries from '../../components/Countries/Countries'
import Filters from '../../components/Filters/Filters'
import SearchBar from '../../components/SearchBar/SearchBar'
import style from './home.module.css'


export default function Home() {

    return(
        <div className={style.homePage}>
            <div className={style.homeAside}>
                <SearchBar/>
                <Filters/>
            </div>
            <Countries/>
        </div>
    )
}