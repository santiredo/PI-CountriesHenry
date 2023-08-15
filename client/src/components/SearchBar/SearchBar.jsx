

import { useState } from 'react'
import style from './searchbar.module.css'
import { useDispatch } from 'react-redux'
import { searchByName } from '../../redux/action'

export default function SearchBar() {

    const [name, setName] = useState('')
    const dispatch = useDispatch()

    const handleSearch = (event) => {
        setName(event.target.value.toLowerCase())
    }

    const displayCountrties = (event) => {
        event.preventDefault()

        console.log(name)

        dispatch(searchByName(name))
    }

    return (
        <form onSubmit={displayCountrties} className={style.searchBar}>
            <input id='name' name='name' value={name} onChange={handleSearch} type="text" />
            <button type='submit'>Search Country</button>
        </form>
    )
}