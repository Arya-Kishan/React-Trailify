import React, { useContext, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "react-lazy-load-image-component/src/effects/blur.css";
import { fireContext } from '../Firebase/FireContext'
import FavoriteIcon from '@mui/icons-material/Favorite';
import heart2 from '../Images/heart4.svg'
import { motion } from 'framer-motion'
import Snack from '../components/SnackBar'
import './img.scss'

const Img = ({ src, classname, dataObj }) => {

    const { add } = useContext(fireContext)
    const [replace, setReplace] = useState(false)
    const {arr} = useContext(fireContext)

    const heart1 = <motion.div initial={{ scale: 0 }}
        whileInView={{ scale: 1.1 }}
        transition={{ duration: .2 }}><img style={{ width: '20px' }} src={heart2} alt="" srcset="" /></motion.div>

    const handlePaint = (e, dataObj) => {
        e.stopPropagation()
        add({ ...dataObj, type: 'movie' })
    }

    return (
        <div className='lazyImg'>
            <div className='heart' onClick={(e) => { handlePaint(e, dataObj) }}>{replace ? heart1 : <FavoriteIcon onClick={() => { 
                setReplace(true)
                arr[0]('liked')
                }} />}</div>
            <LazyLoadImage
                className={`${classname ? classname : 'img'}`}
                alt=''
                src={src}
                effect='blur'
                threshold={200}
                width={window.screen.width <= '700' ? 130 : 220}
            />
        <Snack/>
        </div>

    )
};

export default Img;