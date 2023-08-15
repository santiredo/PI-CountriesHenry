

import React from 'react';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Nav from '../../components/Nav/Nav'

import './form.css'
import style from './form.module.css'
import { getAllCountries } from '../../redux/action';


export default function Form() {


    const countries = useSelector(state => state.allCountries)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCountries())
    })

    const [form, setForm] = useState({
        name:'',
        difficulty:'',
        duration:'',
        season:[],
        Countries:[]
    })

    const handleChange = (event) => {

        console.log(countries)

        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handleDifficulty = (event) => {

        setForm({
            ...form,
            difficulty: event.target.innerText
        })

    }

    const handleSeason = (event) => {
        console.log(form.season)
        if(form.season.length > 1){
            setForm({
                ...form,
                season: [event.target.innerText]
            })
            alert('Only 2 seasons are available at the same time')
        } else{
            setForm({
                ...form,
                season: [...form.season, event.target.innerText]
            })
        }

    }

    const handleCountry = (event) => {
        console.log(form.Countries)

        if(form.Countries.includes(event.target.innerText)){
            return alert('That country has already been choosen')
        }

        if(form.Countries.length > 4){
            alert('Only 5 countries are available at the same time')
            setForm({
                ...form,
                Countries: [event.target.innerText]
            })
        } else {
            setForm({
                ...form,
                Countries: [...form.Countries, event.target.innerText]
            })
        }
    }


    // FUNCIONES PARA LOS SELECTS

    const [difficulty, setDifficulty] = useState(false)
    const [season, setSeason] = useState(false)
    const [country, setCountry] = useState(false)

    const handleSelectDifficulty = (event) => {
        const difficultyOptions = document.querySelector("#difficultyOptions")

        if(!difficulty) {
            setDifficulty(true)
            difficultyOptions.classList.remove('hiddenOptions');            
            difficultyOptions.classList.add('showDifficulty');            

        } else{
            setDifficulty(false)

            setTimeout(() => {
                difficultyOptions.classList.remove('hideDifficulty');
                difficultyOptions.classList.add('hiddenOptions')
                
            }, 500);
            
            difficultyOptions.classList.remove('showDifficulty')
            difficultyOptions.classList.add('hideDifficulty')
        }
        event.currentTarget.classList.toggle('difficultyActive')
    }

    const handleSelectSeason = (event) => {
        const seasonOptions = document.querySelector("#seasonOptions")

        if(!season) {
            setSeason(true)
            seasonOptions.classList.remove('hiddenOptions');            
            seasonOptions.classList.add('showSeason');            

        } else{
            setSeason(false)

            setTimeout(() => {
                seasonOptions.classList.remove('hideSeason');
                seasonOptions.classList.add('hiddenOptions')
                
            }, 500);

            seasonOptions.classList.remove('showSeason')
            seasonOptions.classList.add('hideSeason')
        }
        event.currentTarget.classList.toggle('seasonActive')
    }

    const handleSelectCountry = (event) => {
        const countryOptions = document.querySelector("#countryOptions")

        if(!country) {
            setCountry(true)
            countryOptions.classList.remove('hiddenOptions');            
            countryOptions.classList.add('showCountry');            

        } else{
            setCountry(false)

            setTimeout(() => {
                countryOptions.classList.remove('hideCountry');
                countryOptions.classList.add('hiddenOptions')
                
            }, 500);

            countryOptions.classList.remove('showCountry')
            countryOptions.classList.add('hideCountry')
        }
        event.currentTarget.classList.toggle('countryActive')
    }

    return (
        <div className={style.formPage}>
            <div className={style.nav}>
                <Nav/> 
            </div>
            <h1>Time to create an Activity</h1>
            <form action="">
                <div className='selectBox'>
                    <label>Name</label>
                    <input type="text" name="name" id="name" value={form.name} onChange={handleChange}/>                    
                </div>
                <div className='selectBox'>
                    <div onClick={handleSelectDifficulty} className='difficulty'>
                        <div>
                            <p className='title'>Difficulty</p>
                        </div>
                    </div>
                    <div id='difficulty' name='difficuulty' value={form.difficulty} onChange={handleChange} className={style.options}>{form.difficulty}</div>
                    <div className='hiddenOptions' id="difficultyOptions">
                        <div className="option">
                            <p onClick={handleDifficulty}>1</p>
                        </div>
                        <div className="option">
                            <p onClick={handleDifficulty}>2</p>
                        </div>
                        <div className="option">
                            <p onClick={handleDifficulty}>3</p>
                        </div>
                        <div className="option">
                            <p onClick={handleDifficulty}>4</p>
                        </div>
                        <div className="option">
                            <p onClick={handleDifficulty}>5</p>
                        </div>
                    </div>
                </div>
                <div className='selectBox'>
                    <div onClick={handleSelectSeason} className='season'>
                        <div>
                            <p className='title'>Season</p>
                        </div>
                    </div>
                    <div id='season' name='season' value={form.season} onChange={handleChange} className={style.options}>
                        {
                            form.season.map(season => {
                                return form.season[0] === season ? `${season}, ` : `${season}`
                            })
                        }
                    </div>
                    <div className='hiddenOptions' id="seasonOptions">
                        <div className="option">
                            <p onClick={handleSeason} >Summer</p>
                        </div>
                        <div className="option">
                            <p onClick={handleSeason} >Autumn</p>
                        </div>
                        <div className="option">
                            <p onClick={handleSeason} >Winter</p>
                        </div>
                        <div className="option">
                            <p onClick={handleSeason} >Springs</p>
                        </div>
                    </div>
                </div>
                <div className='selectBox'>
                    <div onClick={handleSelectCountry} className='country'>
                        <div>
                            <p className='title'>Countries</p>
                        </div>
                    </div>
                    <div className='hiddenOptions' id="countryOptions">
                        {
                            countries.map(country => {
                                return(
                                    <div key={country.name} className='option'>
                                        <p onClick={handleCountry}>{country.name}</p>

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div id='Countries' name='Countries' value={form.Countries} onChange={handleChange} className={style.countries}>
                    {
                        form.Countries.map(country => {
                            return (
                                <React.Fragment key={country}>
                                    {form.Countries[4] !== country ? <>{country},<br/></> : `${country}`}
                                </React.Fragment>
                            )
                        })
                    }
                </div>
                <div className='selectBox'>
                    <label>Duration (hs)</label>
                    <input  type="text" name="duration" id="duration" value={form.duration} onChange={handleChange}/>                    
                </div>
                <div>
                    <button type='submit' className={style.button}>CREATE</button>
                </div>

            </form>
        </div>
    )
}