
import Countries from '../../components/Countries/Countries'
import Filters from '../../components/Filters/Filters'
import SearchBar from '../../components/SearchBar/SearchBar'
import Nav from '../../components/Nav/Nav'
import style from './home.module.css'


export default function Home() {

    return(
        <div className={style.homePage}>
            <div className={style.homeAside}>
                <Nav/>
                <SearchBar/>
                <Filters/>
            </div>
            <Countries/>
        </div>
    )
}