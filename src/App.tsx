import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import LoginRouter from './Routes/login-router'
import Router from './Routes/Router'
import { auth } from './configs/firebase-config'
import { useUserActionCreators } from './slices/user-slice'
import './styles/index.scss'

const App = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isUserAuth, setIsUserAuth] = useState<boolean | null>(null)
  const { setUserData } = useUserActionCreators()

  useEffect(() => {
    // TODO: Get user data from firestore using UID here
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('signed in user: ', user)

        const { uid, displayName, email, phoneNumber, photoURL } = user
        setUserData({ uid, displayName, email, phoneNumber, photoURL })
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
