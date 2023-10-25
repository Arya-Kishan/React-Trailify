import React, { useState } from 'react'
import CategoryIcon from '@mui/icons-material/Category';
import { Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCategory } from '../store/HomeSlice'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function Category({ position }) {

    const [category, setCategory] = useState()
    const [open2, setOpen2] = useState(false)
    const { category: list } = useSelector(state => state.home)
    const navigate = useNavigate()

    const fetchList = async () => {
        setCategory(list)
    }

    const handleExplore = (type, name) => {
        navigate(`/explore/${type}/${name}`)
    }

    const handleClose = () => {
        setOpen2(false)
    }

    useEffect(() => {
        fetchList();
    }, [])

    return (
        <div>

            <div onClick={() => {
                setOpen2(true)
                fetchList()
            }}><CategoryIcon /></div>


            <Drawer
                anchor={position}
                open={open2}
                onClose={handleClose}>
                <div className='searchBar2'>
                    {
                        category && <>
                            {
                                category.map((e, i) => (
                                    <div
                                        key={i} onClick={() => {
                                            handleExplore(e.id, e.name)
                                            handleClose()
                                        }}>
                                        <div
                                        >{e.name}</div>
                                    </div>
                                ))}
                        </>
                    }

                </div>
            </Drawer>
        </div>
    )
}
