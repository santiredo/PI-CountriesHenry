

import style from './filters.module.css'

export default function Filters() {


    return (
        <div className={style.allFilters}>
            <h3>Filters</h3>
            <div className={style.options}>
                <p>A - Z</p>
                <p>Z - A</p>
            </div>
            <div className={style.options}>
                <p>+ 🕴🏿 +{/* ⇑ */}</p>
                <p>- 🕴🏿 -{/* ⇓ */}</p>
            </div>
            <div className={style.options}>
                <div className={style.divOverflow}>
                    <p>Africa</p>
                    <p>America</p>
                    <p>Antarctica</p>
                    <p>Asia</p>
                    <p>Europe</p>
                    <p>Oceania</p>
                </div>
            </div>
            <div className={style.options}>
                <div className={style.divOverflow}>
                    <p>Snowboard</p>
                    <p>Ski</p>
                    <p>Trekking</p>
                    <p>Parachuting</p>
                    <p>Climbing</p>
                </div>
            </div>
        </div>
    )
}