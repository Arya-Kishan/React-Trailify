import React, { useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import CardCarousel from '../../../components/cardCarousel/CardCarousel';
import SwitchBoard from '../../../components/switchBoard/SwitchBoard';
import { useParams } from 'react-router-dom';
import '../style.scss'
import { useQueryApi } from '../../../hooks/useQueryApi';

export default function Popular() {

  const [endpoint, setEndpoint] = useState('movie')
  const [background,setBackground] = useState({
    bg1: 'bg',
    bg2: ''
  })
  const { data } = useQueryApi(`/${endpoint}/popular`)
  const { className } = useParams()

  const changeEndpoint = (category) => {
    setEndpoint(category)
    setBackground({
      bg1: '',
      bg2: 'bg'
    })
  }

  return (
    <div className='trending'>
      {
        data ? (
          <div>

            <div className='heading'>
              <div><h1>POPULAR</h1></div>
              <div>
                <SwitchBoard changeEndpoint={changeEndpoint} name1={'Movie'} name2={'TV'} background={background} />
              </div>
            </div>

            <div>
              <CardCarousel classname={className} data={data} endpoint={endpoint} />
            </div>

          </div>
        ) : (
          <div className='otherwise_carousel'>
            <div>

              <div className='heading'>
                <div><h1>POPULAR</h1></div>
                <div>
                  <SwitchBoard changeEndpoint={changeEndpoint} name1={'Movie'} name2={'TV'} />
                </div>
              </div>

              <div className='otherwise_carousel'></div>

            </div>
          </div>
        )
      }
    </div>
  )
}
