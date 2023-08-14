


import { useState } from 'react'
import './form.css'
import style from './form.module.css'
import Nav from '../../components/Nav/Nav'


export default function Form() {


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
                    <input type="text" name="" id="" />                    
                </div>
                <div className='selectBox'>
                    <div onClick={handleSelectDifficulty} className='difficulty'>
                        <div>
                            <p className='title'>Difficulty</p>
                        </div>
                    </div>
                    <div className={style.options}>1</div>
                    <div className='hiddenOptions' id="difficultyOptions">
                        <div className="option">
                            <p /* onClick={handleOrder} */ value="1">1</p>
                        </div>
                        <div className="option">
                            <p /* onClick={handleOrder} */ value="2">2</p>
                        </div>
                        <div className="option">
                            <p /* onClick={handleOrder} */ value="3">3</p>
                        </div>
                        <div className="option">
                            <p /* onClick={handleOrder} */ value="4">4</p>
                        </div>
                        <div className="option">
                            <p /* onClick={handleOrder} */ value="5">5</p>
                        </div>
                    </div>
                </div>
                <div className='selectBox'>
                    <label>Duration (hs) </label>
                    <input type="text" name="" id="" />                    
                </div>
                <div className='selectBox'>
                    <div onClick={handleSelectSeason} className='season'>
                        <div>
                            <p className='title'>Season</p>
                        </div>
                    </div>
                    <div className={style.options}>Summer</div>
                    <div className='hiddenOptions' id="seasonOptions">
                        <div className="option">
                            <p /* onClick={handleOrder} */ value="Summer">Summer</p>
                        </div>
                        <div className="option">
                            <p /* onClick={handleOrder} */ value="Autumn">Autumn</p>
                        </div>
                        <div className="option">
                            <p /* onClick={handleOrder} */ value="Winter">Winter</p>
                        </div>
                        <div className="option">
                            <p /* onClick={handleOrder} */ value="Springs">Springs</p>
                        </div>
                    </div>
                </div>
                <div className='selectBox'>
                    <div onClick={handleSelectCountry} className='country'>
                        <div>
                            <p className='title'>Countries</p>
                        </div>
                    </div>
                    <div className={style.options}>Argentine</div>
                    <div className='hiddenOptions' id="countryOptions">
                        <div className="option">
                            <p /* onClick={handleOrder} */ value="Summer">Summer</p>
                        </div>
                        <div className="option">
                            <p /* onClick={handleOrder} */ value="Autumn">Autumn</p>
                        </div>
                        <div className="option">
                            <p /* onClick={handleOrder} */ value="Winter">Winter</p>
                        </div>
                        <div className="option">
                            <p /* onClick={handleOrder} */ value="Springs">Springs</p>
                        </div>
                    </div>
                </div>
                <div>
                    <button type='submit' className={style.button}>CREATE</button>
                </div>

            </form>
        </div>
    )
}