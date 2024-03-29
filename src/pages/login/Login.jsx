import React, { useEffect } from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from '../../Firebase/Firebase'
import loginImg from '../../Images/login2.gif'
import './login.scss'
import { fireContext } from '../../Firebase/FireContext'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from '../../store/UserSlice'

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export default function Login({setInfo}) {

    const { userInfo, setUserInfo } = useContext(fireContext)
    const dispatch = useDispatch();


    const handleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(val => console.log(val))
            .catch(error => console.log(error))
    }

    useEffect(() => {

        onAuthStateChanged(auth, (userData) => {
            if (userData) {
                console.log(userData)
                console.log(userData.uid)
                dispatch(getUser(userData.uid))
                localStorage.setItem("user", JSON.stringify(userData))
                location.reload();
            } else {
                setUserInfo(null)
            }
        })

    }, [])


    return (
        <div className='login'>
            <img src={loginImg} alt="" srcSet="" />
            <h1>SIGN IN</h1>
            <button onClick={handleSignIn}>LOGIN WITH GMAIL</button>
            <button onClick={()=>setInfo("ARYA")} id='guestBtn'>Guest</button>
        </div>
    )
}
