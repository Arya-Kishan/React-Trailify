import React, { useEffect, useState } from 'react'
import { IconButton, Modal } from '@mui/material';
import { Home } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import Category from '../Category';
import './buttons.scss'

export default function Button() {

  const navigate = useNavigate()
  const [open1, setOpen1] = useState(false)
  const [query, setQuery] = useState('')

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setOpen1(false)
      navigate(`/search/${query}`)
    }
  }

  const handleClose = () => {
    setOpen1(false)
  }

  return (
    <div>

      <div className='floatIcon'>

        <IconButton onClick={(e) => {
          handleSearch(e)
          setOpen1(true)
        }}><SearchIcon /></IconButton>

        <IconButton onClick={() => { navigate(`/`) }}><Home /></IconButton>

        <IconButton><Category position={'bottom'}/></IconButton>

        <IconButton onClick={() => { navigate(`/profile`) }}><PersonIcon /></IconButton>

      </div>

      <Modal
        open={open1}
        onClose={handleClose}>
        <div className='searchBar1'>
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value) }} type="text"
            onKeyUp={(e) => { handleSearch(e) }}
          />
        </div>
      </Modal>

    </div>
  )
}
