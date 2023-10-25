import React from 'react'
import Img from '../../../../components/Img'
// import dayjs from 'dayjs';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import poster from '../../../../Images/no-poster.png'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../../../../components/cardCarousel/CardCarousel.scss'

export default function CategoryCarousel({ data }) {

    const { url } = useSelector(state => state.home);
    const navigate = useNavigate()

    const handleNavigate = (id, type) => {
        navigate(`/details/${type}/${id}`)
    }


    return (
        <div className='carousel1'>
            {
                data ? (
                    <>
                        {

                            data?.map((e) => {
                                const posterUrl = e.poster_path ? url + e.poster_path : poster;
                                return (
                                    <div key={e.id} className='card' onClick={() => { handleNavigate(e.id, 'movie') }}>

                                        <div className='card_img'><Img src={posterUrl} dataObj={e} /></div>

                                        <div className='progress'>
                                            <CircularProgressbar value={e.vote_average.toFixed(1)} maxValue={10} text={e.vote_average.toFixed(1)} background={true} backgroundPadding={6} styles={buildStyles({
                                                pathColor:
                                                    e.vote_average < 5 ? "red" : e.vote_average < 7 ? "orange" : "green",
                                                textColor: 'black',
                                                backgroundColor: 'white'
                                            })} />
                                        </div>

                                        {/* <div className="name">
            {e.original_title ? e.original_title : 'NOT AVAILABLE'}
        </div>

        <div className="date">
            {dayjs(e.release_date).format('MMM D YYYY')}
        </div> */}

                                    </div>
                                )
                            })
                        }
                    </>
                ) : (
                    <div className='carousel_other'></div>
                )
            }
        </div>
    )
}
