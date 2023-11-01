import React, { useContext, useEffect, useState } from 'react'
import profile from '../../Images/profile.jpeg'
import { app } from '../../Firebase/Firebase'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { getAuth, signOut } from 'firebase/auth';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import poster from '../../Images/no-poster.png'
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import emptyImg from '../../Images/empty.gif'
import { fireContext } from '../../Firebase/FireContext'
import { Modal } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import Snack from '../../components/SnackBar'
import './Profile.scss'

const db = getFirestore(app)
const auth = getAuth(app)

export default function Profile() {

  const [data1, setData1] = useState(null)
  const [data2, setData2] = useState(null)
  const [data3, setData3] = useState(true)
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const { url } = useSelector(state => state.home);
  const navigate = useNavigate()
  const { get, delete_Doc, add, get_query_data, arr: snackHandleClick, setArr, userInfo, setUserInfo } = useContext(fireContext)


  const handleNavigate = (id, type) => {
    navigate(`/details/${type}/${id}`)
  }

  const handleSignOut = () => {
    localStorage.clear()
    signOut(auth)
    location.reload()
  }

  let a = [];
  let b = [];
  const getData = () => {
    setData2(null)
    setData3(null)
    get(userInfo.uid)
      .then(val => {
        val.forEach(element => {
          if (!a.includes(element.title)) {
            a.push(element.title)
            b.push(element)
          }
        });
        setData1(b)
      })
  }

  const add_note = () => {
    add({
      name: input,
      type: 'bio'
    })
    handleClose()
    handleList()
    setInput('')
  }

  const handleList = () => {
    setData1(null)
    setData3(null)
    get_query_data()
      .then(val => { setData2(val) })
  }

  const deleteCard = (e, doc_id) => {
    e.stopPropagation()
    delete_Doc(doc_id)
    if (e.target.parentElement.dataset.identity === 'delete_list') {
      snackHandleClick[0]('LIST DELETED');
      handleList()
    } else {
      snackHandleClick[0]('CARD DELETED');
      getData()
    }
  }



  const handleClose = () => {
    setOpen(false)
  }


  return (
    <>
      <div className='profile'>

        <div className='img'>
          <img src={userInfo.photoURL ? userInfo.photoURL : profile} alt="" srcSet="" />
        </div>

        <div className='text'>
          <span>Name : {userInfo.displayName}</span>
          <span>Email : {userInfo.email}</span>
          <div onClick={handleSignOut}><LogoutIcon /><span>Logout</span></div>
        </div>

      </div>


      <div className='profile_category'>
        <div onClick={getData}>LIKED</div>
        <div onClick={handleList}>YOUR LIST</div>
      </div>



      <div className='profile_carousel'>

        {
          data1 && (
            <div className='carousel123'>
              {
                data1?.map((element, i) => {
                  const posterUrl = element.poster_path ? url + element.poster_path : poster;
                  return (
                    <div key={i} className='profile_card' onClick={() => { handleNavigate(element.id, element.media_type || 'movie') }}>

                      <div className='img_div'>
                        <img src={posterUrl} />
                        <DeleteIcon data-identity={'delete_card'} onClick={(e) => { deleteCard(e, element.firebase_id) }} className='delete_icon' />
                      </div>

                    </div>
                  )
                })
              }
            </div>
          )
        }






        {
          data2 && (
            <div className='profile_list'>

              <div><h2>ADD YOUR FAVOURITE MOVIES</h2></div>

              <div><AddBoxIcon className='add_icon' onClick={() => { setOpen(true) }} /></div>


              <div className='list'>
                {
                  data2?.reverse().map((element, i) => (
                    <div key={i}>
                      <span>{i + 1}. {element.name} </span>
                      <span><DeleteIcon data-identity={'delete_list'} onClick={(e) => { deleteCard(e, element.firebase_id) }} /></span>
                    </div>
                  ))
                }
              </div>

            </div>
          )
        }






        {
          data3 && (
            <div className='otherwise_profile'>
              <img src={emptyImg} alt="" srcSet="" />
            </div>
          )
        }

        <Modal
          open={open}
          onClose={handleClose}>
          <div className='profile_input'>
            <input value={input} onChange={(e) => { setInput(e.target.value) }} type="text" />
            <button onClick={add_note}>ADD</button>
          </div>

        </Modal>

      </div>


      <Snack />


    </>
  )
}
