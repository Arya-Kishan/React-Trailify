import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import CategoryCarousel from './categoryCarousel.jsx/CategoryCarousel';
import { useQueryApi } from '../../../hooks/useQueryApi';

export default function EachCategory({ id }) {

  let { data: res } = useQueryApi('/movie/popular', id)

  return (
    <div className='each_category'>
      {
        res && <CategoryCarousel data={res.results} />
      }
    </div>
  )
}
