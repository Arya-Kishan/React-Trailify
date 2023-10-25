import React from 'react'
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "react-lazy-load-image-component/src/effects/blur.css";
import './slider.scss'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Slider = () => {

    const [data, setData] = useState(null)
    const { url } = useSelector(state => state.home)
    const navigate = useNavigate()

    const fetchList2 = async () => {
        let res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7fad363f58889077cd601fe2d0ed4fb7&with_genres=28`)
        res = await res.json()
        res = res.results;
        setData(res)
    }

    const handleNavigate = (id) => {
        navigate(`/details/movie/${id}`)
    }

    useEffect(() => {
        fetchList2()
    }, [])


    return (
        <div className='main_slider'>
            <Swiper
                // install Swiper modules
                autoplay={{ delay: 3000 }}
                modules={[Pagination, Scrollbar, Autoplay]}
                slidesPerView={1}
                pagination={{ clickable: true }}
            >

                {
                    data &&
                    <>
                        <div>
                            {
                                data.map((e) => (
                                    <SwiperSlide key={e.id} className='swiper' onClick={() => { handleNavigate(e.id) }}>

                                        <div className='swiperDiv'>
                                            <LazyLoadImage
                                                alt=''
                                                src={url + e.backdrop_path}
                                                effect='blur'
                                                threshold={200}
                                            />
                                        </div>

                                        <div className='slider_title'>
                                            <div><h1>{e.title}</h1></div>
                                        </div>

                                    </SwiperSlide>
                                ))
                            }
                        </div>
                    </>
                }

            </Swiper>
        </div>
    )
}

export default Slider
