import React, { useEffect, useState } from 'react'
import './homebanner.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';



export default function HomeBanner() {

    const { url } = useSelector(state => state.home);
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const { popular: data } = useSelector(state => state.home)

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/search/${query}`)
        }
    }


    return (
        <div>
            <div className='homebanner'>
                {data ? (
                    <>
                        <div className='homebanner_img'>

                            <div className='frontText'>

                                <div><h1>WELCOME</h1></div>

                                <div><span>Millions of movies, TV shoes and people to discover .</span></div>

                                <div className='homeInput'>
                                    <input
                                        placeholder='Search for movie..'
                                        value={query}
                                        onChange={(e) => { setQuery(e.target.value) }} type="text"
                                        onKeyUp={(e) => { handleSearch(e) }}
                                    />
                                    <span>Search</span>
                                </div>

                            </div>

                            <img src={(url + data[Math.floor(Math.random() * 19)]?.backdrop_path)} alt="" srcSet="" />

                            <div className="opacity-layer"></div>

                        </div>
                    </>
                ) : (
                    <div className='otherwise_homeBanner'>

                        <div className='frontText'>

                            <div><h1>WELCOME</h1></div>

                            <div><span>Millions of movies, TV shoes and people to discover .</span></div>

                            <div className='homeInput'>
                                <input
                                    placeholder='Search for movie..'
                                    value={query}
                                    onChange={(e) => { setQuery(e.target.value) }} type="text"
                                    onKeyUp={(e) => { handleSearch(e) }}
                                />
                                <span>Search</span>
                            </div>

                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}
