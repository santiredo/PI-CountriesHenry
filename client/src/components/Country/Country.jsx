

import style from './country.module.css'

export default function Country({name, image, continent}) {
    return (
        <div className={style.countryCard}>
            <img className={style.background} src={image} alt="" />
            <div className={style.cardInfo}>
                <div className={style.imageDiv}>
                    <div>
                        <img src={image} alt="" />
                    </div>
                </div>
                <div className={style.countryDetails}>
                    <h3>{name}</h3>
                    <p>{continent}</p>
                </div>
            </div>
        </div>
    )
}