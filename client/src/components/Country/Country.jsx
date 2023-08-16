import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import style from './country.module.css';

class Country extends Component {
    render() {
        const { id, name, image, continent } = this.props;

        return (
            <div className={style.countryCard}>
                <img className={style.background} src={image} alt="" />
                <div className={style.cardInfo}>
                    <div className={style.imageDiv}>
                        <div>
                            <img src={image} alt="" />
                            <NavLink to={`/detail/${id}`}>+INFO</NavLink>
                        </div>
                    </div>
                    <div className={style.countryDetails}>
                        <h3>{name}</h3>
                        <p>{continent}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Country;
