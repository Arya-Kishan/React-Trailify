import React, { useState } from 'react'
import './SwitchBoard.scss'

export default function SwitchBoard({ name1, name2, changeEndpoint, background }) {


    const changeBox = (e) => {
        changeEndpoint(e.target.innerText.toLowerCase())
        if (e.target.dataset.id === '1') {
            e.target.nextElementSibling.className = ''
            e.target.className = 'bg';
        } else if (e.target.dataset.id === '2') {
            e.target.previousElementSibling.className = ''
            e.target.className = 'bg';
        }
    }
    return (
        <div className='switch'>

            <div data-id='1' className={background?.bg1} onClick={(e) => { changeBox(e) }}>{name1}</div>

            <div data-id='2' className={background?.bg2} onClick={(e) => { changeBox(e) }}>{name2}</div>

        </div>
    )
}
