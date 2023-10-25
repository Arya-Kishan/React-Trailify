import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import ProgressBar from './ProgressBar'
import useFetch from '../hooks/useFetch'
import VideoSection from './video/VideoSection'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Cast from './cast/Cast'
import VideoPage from '../pages/Details/VideoSection/VideoPage'
import CardCarousel from './cardCarousel/CardCarousel'
import './detail.scss'


export default function Detail({ data, type, id }) {

    const { url } = useSelector(state => state.home)
    const [show, setShow] = useState(false)

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    const { data: video } = useFetch(`/${type}/${id}/videos`)
    const { data: credits } = useFetch(`/${type}/${id}/credits`)
    const { data: similar } = useFetch(`/${type}/${id}/similar`);
    const { data: recommendations } = useFetch(
        `/${type}/${id}/recommendations`
    );

    const handlePlay = () => {
        setShow(true)
    }


    return (
        <div className='detailPage' >

            <div className='bgImg' style={{ backgroundImage: `url(${url + data.poster_path})` }}>
                <div className="opacity_layer"></div>
            </div>


            <div className='main_detail'>

                <div className='detail_img'>
                    <img src={url + data.poster_path} />
                </div>

                <div className='detail'>

                    <div className='title'><h1>{data.title}</h1></div>

                    {/* <div>{data.tagline}</div> */}

                    <div className='genre'>{data.genres.map((e, i) => (<div key={i}>{e.name}</div>))}</div>

                    <div className='round'>

                        <ProgressBar vote={data.vote_average} />

                        <div>
                            <VideoSection setShow={setShow} show={show} videoId={video?.results[0]?.key} />
                        </div>

                        <div onClick={() => { handlePlay() }} className='main_icon'>
                            <PlayCircleIcon className='icon' /><div>WATCH TRAILER</div>
                        </div>


                    </div>

                    <div className='overview'><div><h2>OVERVIEW</h2></div><div>{data.overview}</div></div>

                    <div className='together'>

                        <div>
                            <div><span>Status</span></div>
                            <div>{data.status}</div>
                        </div>

                        <div>
                            <div><span>Runtime</span></div>
                            <div>{toHoursAndMinutes(data.runtime)}</div>
                        </div>

                        <div><div><span>Released Date</span></div><div>{dayjs(data.release_date).format('MMM DD, YYYY')}</div></div>

                    </div>

                </div>
            </div>

            <Cast credits={credits?.cast.length > 1 ? credits?.cast : null} />

            <VideoPage setShow={setShow} show={show} video={video?.results.length > 1 ? video?.results : null} />

            <div>
                <h1 style={{ padding: '10px' }}>{similar?.results.length > 1 ? 'Similar' : ''}</h1>
                <CardCarousel data={similar} endpoint={type} />
            </div>

            <div>
                <h1 style={{ padding: '10px' }}>{recommendations?.results.length > 1 ? 'Recommendations' : ''}</h1>
                <CardCarousel data={recommendations} endpoint={type} />
            </div>

        </div>
    )
}