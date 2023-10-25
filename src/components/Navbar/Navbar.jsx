import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { IconButton, Modal } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Category from '../Category'
import logo from '../../Images/logo1.png'
import './navbar.scss'

export default function Navbar() {

    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    window.addEventListener('scroll', () => {
        let nav = document.querySelector('.navbar')
        if (window.scrollY > 100) {
            nav.style.background = 'linear-gradient(to right, black,transparent)'
        } else {
            nav.style.background = 'transparent'
        }
    })

    const handleShow = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            setOpen(false)
            navigate(`/search/${query}`)
        }
    }

    return (
        <>
            <div className='navbar'>
                <div className='logo'><img src={logo} alt="" srcSet="" /></div>

                <div className='navIcons'>

                    <IconButton onClick={() => { handleShow() }}><SearchIcon /></IconButton>

                    <IconButton onClick={() => { navigate(`/profile`) }}><PersonIcon /></IconButton>

                    <Category position={'top'} />

                </div>

            </div>

            <Modal
                open={open}
                onClose={handleClose}>
                <div className='searchBar'>
                    <input
                        value={query}
                        onChange={(e) => { setQuery(e.target.value) }} type="text"
                        onKeyUp={(e) => { handleSearch(e) }}
                    />
                </div>
            </Modal>
        </>
    )
}
