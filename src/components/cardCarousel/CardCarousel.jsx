import React from 'react'
import Img from '../Img'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import poster from '../../Images/no-poster.png'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './CardCarousel.scss'


export default function CardCarousel({ data, endpoint, classname }) {
    const { url } = useSelector(state => state.home);
    const navigate = useNavigate()

    const handleNavigate = (id, type) => {
        navigate(`/details/${type}/${id}`)
    }
    return (
        <div className={classname ? classname : 'carousel1'}>
            {
                data ? (
                    <>
                        {

                            data?.results?.map((e) => {
                                const posterUrl = e.poster_path ? url + e.poster_path : poster;
                                return (
                                    <div key={e.id} className='card' onClick={() => { handleNavigate(e.id, endpoint || e.media_type) }}>

                                        <div className='card_img'><Img src={posterUrl} dataObj={e} /></div>

                                        <div className='progress'>
                                            <CircularProgressbar value={e.vote_average.toFixed(1)} maxValue={10} text={e.vote_average.toFixed(1)} background={true} backgroundPadding={6} styles={buildStyles({
                                                pathColor:
                                                    e.vote_average < 5 ? "red" : e.vote_average < 7 ? "orange" : "green",
                                                textColor: 'black',
                                                backgroundColor: 'white'
                                            })} />
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </>
                ) : (
                    <div className='carousel_other'>arya</div>
                )
            }
        </div>
    )
}
