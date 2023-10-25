import React from 'react'
import './SwitchBoard.scss'

let background1 = 'bg';
let background2 = '';

export default function SwitchBoard({ name1, name2, changeEndpoint }) {


    const changeBox = (e) => {
        changeEndpoint(e.target.innerText.toLowerCase())
        if (e.target.dataset.id === '1') {
            background1 = 'bg';
            background2 = '';
        } else if (e.target.dataset.id === '2') {
            background1 = '';
            background2 = 'bg';
        }

    }
    return (
        <div className='switch'>

            <div data-id='1' className={background1} onClick={(e) => { changeBox(e) }}>{name1}</div>

            <div data-id='2' className={background2} onClick={(e) => { changeBox(e) }}>{name2}</div>

        </div>
    )
}
