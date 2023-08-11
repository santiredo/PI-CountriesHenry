

import style from './searchbar.module.css'

export default function SearchBar() {


    return (
        <form className={style.searchBar}>
            <input type="text" />
            <button>Search Country</button>
        </form>
    )
}