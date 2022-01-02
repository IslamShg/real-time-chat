import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'

import LoginRouter from './Routes/login-router'
import Router from './Routes/Router'
import { store } from './slices/root-state'
import { auth } from './configs/firebase-config'
import './styles/index.scss'

const App = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isUserAuth, setIsUserAuth] = useState<boolean | null>(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserAuth(true)
        setLoading(false)
        return
      }
      setLoading(false)
      setIsUserAuth(false)
    })
  }, [])

  return !loading ? (
    <Provider store={store}>
      {isUserAuth ? <Router /> : <LoginRouter />}
    </Provider>
  ) : (
    <p>Loading...</p>
  )
}

export default App
