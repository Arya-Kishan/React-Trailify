import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import loading from '../../Images/loading.svg'
import Detail from '../../components/Detail'

export default function Details() {

  const { type, id } = useParams()
  const { data } = useFetch(`/${type}/${id}`)

  return (
    <div>
      {
        data ? (
          <Detail data={data} type={type} id={id}/>
        ) : (
          <div><img className='loading' src={loading} alt="" srcSet="" /></div>
        )
      }
    </div>
  )
}
