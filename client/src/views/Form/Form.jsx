

import React from 'react';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Nav from '../../components/Nav/Nav';
import { getAllCountries } from '../../redux/action';
import { validateForm, validateSubmit } from './Validation/validations';
import creativity from '../../assets/creativityGif.gif'
import Swal from 'sweetalert2';
import axios from 'axios';
import './form.css'
import style from './form.module.css'


export default function Form() {
    
    const dispatch = useDispatch()

    const UserId = JSON.parse(localStorage.getItem('userData')).id

    const [form, setForm] = useState({
        name:'',
        difficulty:'',
        duration:'',
        season:'',
        Countries:[]
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(getAllCountries())
    },[])

    useEffect(() => {

        setErrors(validateForm(form))

    },[form])


    const submitHandler = async(event) => {
        event.preventDefault()

        if(!validateSubmit(form)){
            setForm({
                ...form,
                difficulty: Number(form.difficulty),
                duration: Number(form.duration)
            })

            try {
                console.log(UserId)
                const response = await axios.post(`https://pi-countrieshenry-production.up.railway.app/activities/${UserId}`, form)

                console.log(response.data)

                typeof response.data === 'string'
                ? Swal.fire(`Ups, sorry ${response.data}`)
                : Swal.fire(`Congratulation ${JSON.parse(localStorage.getItem('userData')).username}, your activity is now in the database`)

            } catch (error) {
                console.log(error.message)
                Swal.fire(`${error.message}`)
            }

            setForm({
                name:'',
                difficulty:'',
                duration:'',
                season:'',
                Countries:[]
            })
        }else{
            Swal.fire('Ups, complete the form correctly please')
        }

    }
    

    // LLAMADO PARA RENDERIZAR LOS PAISES
    const countries = useSelector(state => state.allCountries)

    //////// MANEJADORES PARA EL CHANGE DE LOS INPUTS

    const handleChange = (event) => {

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
        setForm({
            ...form,
            season: event.target.innerText
        })
    }

    const handleCountry = (event) => {

        if(form.Countries.includes(event.target.innerText)){
            return Swal.fire('That country has already been choosen')
        }

        if(form.Countries.length > 4){
            Swal.fire('Only 5 countries are available at the same time')
        } else {
            setForm({
                ...form,
                Countries: [...form.Countries, event.target.innerText]
            })
        }
    }


    //////// FUNCIONES PARA LOS SELECTS (CSS)

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

    const handleClickOutside = () => {

        const difficultyActive = document.querySelector('.difficulty')

        if(difficulty){
            setDifficulty(false)

            setTimeout(() => {
                difficultyOptions.classList.remove('hideDifficulty');
                difficultyOptions.classList.add('hiddenOptions')
                
            }, 500);
            
            difficultyOptions.classList.remove('showDifficulty')
            difficultyOptions.classList.add('hideDifficulty')
            difficultyActive.classList.value.includes('difficultyActive') && difficultyActive.classList.toggle('difficultyActive')
            
        }

        const seasonActive = document.querySelector('.season')

        if(season === true){
            setSeason(false)

            setTimeout(() => {
                seasonOptions.classList.remove('hideSeason');
                seasonOptions.classList.add('hiddenOptions')
                
            }, 500);

            seasonOptions.classList.remove('showSeason')
            seasonOptions.classList.add('hideSeason')
            seasonActive.classList.value.includes('seasonActive') && seasonActive.classList.toggle('seasonActive')

        }

        const countryActive = document.querySelector('.country')

        if(country === true){
            setCountry(false)

            setTimeout(() => {
                countryOptions.classList.remove('hideCountry');
                countryOptions.classList.add('hiddenOptions')
                
            }, 500);

            countryOptions.classList.remove('showCountry')
            countryOptions.classList.add('hideCountry')
            countryActive.classList.value.includes('countryActive') && countryActive.classList.toggle('countryActive')
        }

    }

    // ELIMINAR UN PAIS COMO OPCION

    const handleDeleteCountry = (deletedCountry) => {
        const udpdatedCountries = [...form.Countries].filter(country => country !== deletedCountry)

        setForm({
            ...form,
            Countries: udpdatedCountries
        })

        
    }

    return (
        <div className={style.formPage} onClick={handleClickOutside}>
            <div className={style.nav}>
                <Nav/> 
            </div>
            <img className={style.creativityGif} src={creativity} alt="" />
            <h1>Time to create an Activity</h1>
            <form onSubmit={submitHandler}>
                <div className='selectBox'>
                    <div className={style.label}>
                        <label>Name:</label>
                        {errors?.name && <p className={style.error}>{errors.name}</p>}
                    </div>
                    <input type="text" name="name" id="name" value={form.name} onChange={handleChange}/>
                </div>
                <div className='selectBox'>
                    {errors?.difficulty && <span>{errors.difficulty}</span>}
                    <div onClick={handleSelectDifficulty} className='difficulty'>
                        <div>
                            <p className='title'>Difficulty</p>
                        </div>
                    </div>
                    <div id='difficulty' name='difficulty' value={form.difficulty} onChange={handleChange} className={style.options}>{form.difficulty}</div>
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
                    {errors?.season && <span>{errors.season}</span>}
                    <div onClick={handleSelectSeason} className='season'>
                        <div>
                            <p className='title'>Season</p>
                        </div>
                    </div>
                    <div id='season' name='season' value={form.season} onChange={handleChange} className={style.options}>{form.season}</div>
                    <div className='hiddenOptions' id="seasonOptions">
                        <div className="option">
                            <p onClick={handleSeason}>Summer</p>
                        </div>
                        <div className="option">
                            <p onClick={handleSeason}>Autumn</p>
                        </div>
                        <div className="option">
                            <p onClick={handleSeason}>Winter</p>
                        </div>
                        <div className="option">
                            <p onClick={handleSeason}>Spring</p>
                        </div>
                    </div>
                </div>
                <div className='selectBox'>
                {errors?.Countries && <span>{errors.Countries}</span>}
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
                    <div id='Countries' name='Countries' value={form.Countries} onChange={handleChange} className={style.countries}>
                        {
                            form.Countries.map(country => {
                                return (
                                    <React.Fragment key={country}>
                                        {<div className={style.selectedCountries}><h5 className={style.h5}>{country}</h5><p onClick={()=>{handleDeleteCountry(country)}}>X</p><br/></div>}
                                    </React.Fragment>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='selectBox'>
                    <div className={style.label}>
                        <label>Duration(hs):</label>
                        {errors?.duration && <p className={style.error}>{errors.duration}</p>}
                    </div>
                    <input  type="text" name="duration" id="duration" value={form.duration} onChange={handleChange}/>                    
                </div>
                <button type='submit' className={style.button}>CREATE</button>
            </form>
        </div>
    )
}