import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchDataFromApi } from '../../utilis/Api'
import dayjs from 'dayjs'
import { CircularProgressbar } from 'react-circular-progressbar'
import Img from '../../components/Img'
import { useSelector } from 'react-redux'
import poster from '../../Images/no-poster.png'
import 'react-circular-progressbar/dist/styles.css';
import './searchPage.scss'



const SearchPage = () => {

  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();
  const { url } = useSelector(state => state.home)
  const navigate = useNavigate()

  const fetchInitialData = () => {
    setLoading(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then((res) => {
        setData(res)
        setPageNum((prev) => prev + 1)
        setLoading(false)
      })
  }

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then((res) => {
        if (data.results) {
          setData({ ...data, results: [...data?.results, ...res.results] })
        } else {
          setData(res)
        }
        setPageNum((prev) => prev + 1)
      })
  }

  useEffect(() => {
    setPageNum(1)
    fetchInitialData();
  }, [query])

  const handleNavigate = (id, type) => {
    navigate(`/details/${type}/${id}`)
  }

  return (
    <div className='searchResultsPage'>
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          {data?.results?.length > 0 ? (
            <>
              <InfiniteScroll
                className='content'
                dataLength={data?.results.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<div>Loading...</div>}
              >
                {data?.results.map((e, i) => {
                  const posterUrl = e.poster_path ? url + e.poster_path : poster;
                  return (
                    <div key={i}>
                      <div className='card' onClick={() => { handleNavigate(e.id, e.media_type) }}>

                        <div className='searchImg'><Img src={posterUrl} /></div>

                        <div className='searchIMDB'>
                          {Math.floor(e.vote_average).toString()}
                        </div>

                        <div className="name">
                          {e.title || e.name}
                        </div>
                        <div className="date">
                          {dayjs(e.release_date).format('MMM D YYYY')}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">
              Sorry ,Results Not Found </span>
          )}
        </>
      )}
    </div>
  )
}

export default SearchPage
