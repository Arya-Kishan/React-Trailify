import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import Img from '../../components/Img'
import { useSelector } from 'react-redux'
import poster from '../../Images/no-poster.png'
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom'
import { MenuItem, Select } from '@mui/material'
import './explore.scss'

export default function Explore() {

    const { id, name } = useParams()
    const [data, setData] = useState()
    const { url } = useSelector(state => state.home)
    const navigate = useNavigate()

    const [age, setAge] = React.useState('');

    const handleChange = async (event) => {

        let res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7fad363f58889077cd601fe2d0ed4fb7&with_genres=${id}`)
        res = await res.json()
        res = res.results;

        if (event.target.value === 'all') {
            setData(res)
        } else {
            setData(res?.filter((e) => (
                e.vote_average >= event.target.value && e.vote_average <= event.target.value + 1
            )))
        }

    };

    const getData = async () => {
        let res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7fad363f58889077cd601fe2d0ed4fb7&with_genres=${id}`)
        res = await res.json()
        res = res.results;
        setData(res)
    }

    useEffect(() => {
        getData();
    }, [id])

    const handleNavigate = (id, type) => {
        navigate(`/details/${type}/${id}`)
    }


    return (
        <>

            <div className='explore_heading'>
                <div><h1>{name.toUpperCase()}</h1></div>
                <div>IMDB
                    <Select
                        value={age}
                        label="IMDB"
                        onChange={handleChange}
                        style={{ border: 'none' }}
                    >
                        <MenuItem style={{ color: 'black' }} value={1}>1</MenuItem>
                        <MenuItem style={{ color: 'black' }} value={2}>2</MenuItem>
                        <MenuItem style={{ color: 'black' }} value={3}>3</MenuItem>
                        <MenuItem style={{ color: 'black' }} value={4}>4</MenuItem>
                        <MenuItem style={{ color: 'black' }} value={5}>5</MenuItem>
                        <MenuItem style={{ color: 'black' }} value={6}>6</MenuItem>
                        <MenuItem style={{ color: 'black' }} value={7}>7</MenuItem>
                        <MenuItem style={{ color: 'black' }} value={8}>8</MenuItem>
                        <MenuItem style={{ color: 'black' }} value={9}>9</MenuItem>
                        <MenuItem style={{ color: 'black' }} value={'all'}>All</MenuItem>
                    </Select>
                </div>
            </div>


            {data ? (
                <div className='explore'>

                    {data?.map((e, i) => {

                        const posterUrl = e.poster_path ? url + e.poster_path : poster;

                        return (

                            <div key={i}>

                                <div className='card' onClick={() => { handleNavigate(e.id, 'movie') }}>

                                    <div className='img_progress'>

                                        <Img src={posterUrl} />

                                        {/* <div className='progressBar' style={{ width: 50, height: 50 }}>
                                            <CircularProgressbar value={e.vote_average} maxValue={10} text={e.vote_average} />
                                        </div> */}

                                    </div>

                                    <div className="name">
                                        {e.title || e.name}
                                    </div>

                                    <div className="date">
                                        {dayjs(e.release_date).format('MMM D YYYY')}
                                    </div>

                                </div>

                            </div>
                        )
                    })}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    )
}
