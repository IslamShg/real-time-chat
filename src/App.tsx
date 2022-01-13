import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

import LoginRouter from './Routes/login-router'
import Router from './Routes/Router'
import { auth, db } from './configs/firebase-config'
import { useUserActionCreators } from './slices/user-slice'
import './styles/index.scss'

const App = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isUserAuth, setIsUserAuth] = useState<boolean | null>(null)
  const { setUserData } = useUserActionCreators()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { uid } = user
        const userDocRef = doc(db, 'users', uid)
        const docSnap = await getDoc(userDocRef)

        if (docSnap.exists()) {
          const { displayName, email, phoneNumber, photoURL, userMetadata } =
            docSnap.data()
          await updateDoc(userDocRef, {
            userMetadata: { ...userMetadata, lastAuthTime: Date.now() }
          })
          setUserData({
            uid,
            displayName,
            email,
            phoneNumber,
            photoURL
          })
        }

        setIsUserAuth(true)
        setLoading(false)
        return
      }
      setLoading(false)
      setIsUserAuth(false)
    })
  }, [setUserData])

  if (loading) return <p>Loading...</p>

  return isUserAuth ? <Router /> : <LoginRouter />
}

export default App
