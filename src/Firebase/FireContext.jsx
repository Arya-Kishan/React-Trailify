import React, { createContext, useState } from 'react'
import { app } from './Firebase'
import { getFirestore, collection, addDoc, getDocs, deleteDoc, where, query, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { useSelector } from 'react-redux'

const db = getFirestore(app)
const auth = getAuth(app)
export const fireContext = createContext()

export default function FireContext({ children }) {

  const { user } = useSelector(state => state.user)
  const [arr,setArr] = useState(null)
  const [userInfo,setUserInfo] = useState(JSON.parse(localStorage.getItem("user")))

  const add = async (dataObj) => {
    await addDoc(collection(db, user), dataObj)
  }

  const get = async (coll_name) => {
    const coll_ref = collection(db, coll_name)
    const q = query(coll_ref, where('type', '==', 'movie'))
    let res = await getDocs(q)
    return (res.docs.map((e) => ({ ...e.data(), firebase_id: e.id })))
  }

  const get_query_data = async () => {
    const collection_ref = collection(db, user);
    const q = query(collection_ref, where('type', '==', 'bio'))
    const snap = await getDocs(q)
    return snap.docs.map((e) => ({ ...e.data(), firebase_id: e.id }))
  }

  const delete_Doc = async (id) => {
    try {
      await deleteDoc(doc(db, user, id));
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <fireContext.Provider value={{ add, get, delete_Doc, get_query_data, arr, setArr, userInfo,setUserInfo }}>
        {children}
      </fireContext.Provider>
    </div>
  )
}
