import React, { useState } from 'react'
import Img from '../../../components/Img'
import VideoSection from '../../../components/video/VideoSection'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import './videopage.scss'

export default function VideoPage({ video }) {

    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(true)
    }

    if (video === null) {
        return ;
    }

    return (
        <>
            <div className='main_video_official'>
                <div><h1>Official Videos</h1></div>
                <div className='videopage'>
                    {
                        video?.map((e) => (

                            <div key={e.id} className='videoBox'>

                                <div className="videoThumbnail" onClick={handleShow}>

                                    <img loading='lazy' src={`https://img.youtube.com/vi/${e.key}/mqdefault.jpg`} />

                                    <div className='play'><PlayCircleIcon className='icon' /></div>
                                    
                                </div>

                                <div className="videoTitle">
                                    {e.name}
                                </div>

                                <div className='trailer'>
                                    <VideoSection setShow={setShow} show={show} videoId={e.key} />
                                </div>

                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
