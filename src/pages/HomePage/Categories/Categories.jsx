import React from 'react'
import { useState, useEffect } from 'react'
import EachCategory from './EachCategory'
import { useSelector } from 'react-redux'

export default function Categories({from, to}) {

    const [data, setData] = useState(null)
    const {category} = useSelector(state => state.home)
    const fetchList = async () => {
        let res = category.slice(from,to)
        setData(res)
    }

    useEffect(() => {
        fetchList()
    }, [])


    return (
        <div>
            {data?.map((e) => (
                <div key={e.id}>
                    <h2 className='category_carousel_heading' style={{padding : '10px'}}>{e.name}</h2>
                    <EachCategory id={e.id} />
                </div>
            ))}
        </div>
    )
}
