import React, { useEffect, useState } from 'react'
import './textscroll.scss'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function TextScroll() {

  const [data, setData] = useState()
  const navigate = useNavigate()
  const { category } = useSelector(state => state.home)

  const fetchList = async () => {
    setData(category)
  }

  const handleExplore = (id, name) => {
    navigate(`/explore/${id}/${name}`)

  }

  useEffect(() => {
    fetchList()
  }, [])


  return (
    <div className='main_box'>

      <div className='boxes'>
        <div className='inner_box'>
          {
            data?.map((e) => (
              <div key={e.id} className="box" onClick={() => { handleExplore(e.id, e.name) }}>{e.name}</div>
            ))
          }
        </div>
      </div>


    </div>
  )
}
