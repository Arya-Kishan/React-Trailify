import React from 'react'
import { useSelector } from 'react-redux'
import poster from '../../Images/no-poster.png'
import './cast.scss'

export default function Cast({ credits }) {
    const { url } = useSelector(state => state.home)
    return (
        <>
            <div><h1>Top Cast</h1></div>
            <div className='cast'>
                {
                    credits?.map((e, i) => {
                        const posterUrl = e.profile_path ? url + e.profile_path : poster;
                        return (<div key={i}>
                            <div className='photo'>
                                <img loading='lazy' src={posterUrl} />
                                <div className='text'>
                                    <div className='real_name'>{e.name}</div>
                                    <div className='character_name'>{e.character}</div>
                                </div>
                            </div>
                        </div>)
                    })
                }
            </div>
        </>
    )
}
