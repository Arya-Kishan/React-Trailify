import React, { useContext, useState } from 'react'
import { IconButton, Modal } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import Category from '../Category';
import './buttons.scss'
import { fireContext } from '../../Firebase/FireContext'

export default function Button() {

  const { arr } = useContext(fireContext)
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

  const handleProfile = () => {

    if (localStorage.getItem("user")) {
      navigate(`/profile`)
    } else {
      console.log("sadssdasd");
      arr[0]('Login !  Reload')
    }

  }

  return (
    <div>

      <div className='floatIcon'>

        <IconButton onClick={(e) => {
          handleSearch(e)
          setOpen1(true)
        }}><SearchIcon /></IconButton>

        <IconButton onClick={() => { navigate(`/`) }}><HomeIcon /></IconButton>

        <IconButton><Category position={'bottom'} /></IconButton>

        <IconButton onClick={handleProfile}><PersonIcon /></IconButton>

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
