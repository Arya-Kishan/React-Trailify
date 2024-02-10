import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import CategoryCarousel from './categoryCarousel.jsx/CategoryCarousel';
import { useQueryApi } from '../../../hooks/useQueryApi';
import './EachCategory.scss'

export default function EachCategory({ id }) {

  let { data: res } = useQueryApi('/discover/movie', id)

  return (
    <div className='each_category'>
      {
        res && <CategoryCarousel data={res.results} />
      }
    </div>
  )
}
