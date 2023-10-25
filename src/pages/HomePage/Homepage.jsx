import React, { useEffect } from 'react'
import './style.scss'
import { lazy } from 'react'
import { Suspense } from 'react'
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import HomeBanner from './homeBanner/HomeBanner';
import Popular from './popular/Popular';
import TopRated from './topRated/TopRated'
import Trending from './trending/Trending'
import TextScroll from '../../components/infiniteScroll/TextScroll';
// import Categories from './Categories/Categories';
// import Slider from './slider/Slider';
// import Footer from '../../components/footer/Footer';

// const HomeBanner = lazy(() => import('./homeBanner/HomeBanner'))
// const Popular = lazy(() => import('./popular/Popular'))
// const TopRated = lazy(() => import('./topRated/TopRated'))
// const Trending = lazy(() => import('./trending/Trending'))
// const TextScroll = lazy(() => import('../../components/infiniteScroll/TextScroll'))
const Categories = lazy(() => import('./Categories/Categories'))
const Slider = lazy(() => import('./slider/Slider'))
const Footer = lazy(() => import('../../components/footer/Footer'))





export default function Homepage() {

  return (
    <div>
      <HomeBanner />
      <Trending />
      <Popular />
      <TopRated />
      <TextScroll />
      <Suspense fallback={<h1>Loading...Homepage</h1>} >
        <LazyLoadComponent
          threshold={200}>
          <Categories from={0} to={3} />
          <Slider />
          <Categories from={3} to={10} />
          <Footer />
        </LazyLoadComponent>
      </Suspense>
    </div>
  )
}