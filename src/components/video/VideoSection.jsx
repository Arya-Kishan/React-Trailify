import React from 'react'
import ReactPlayer from 'react-player/youtube'
import './video.scss'
import { Modal } from '@mui/material'

export default function VideoSection({ videoId, show, setShow }) {

    const handleClose = () => {
        setShow(false)
    }
    
    return (
        <div>
            <Modal
                open={show}
                onClose={handleClose}
            >
                <div className='video'>
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${videoId}`}
                        controls
                        width="100%"
                        height="100%"
                    // playing={true}
                    />
                </div>
            </Modal>
        </div>
    )
}
