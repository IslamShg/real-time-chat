import React from 'react'

import LoginRouter from './routes/login-router'
import Router from './routes/Router'
import { useAuth, TriangleLoader } from './shared'
import './styles/index.scss'

const App = () => {
  const { loading, isUserAuth } = useAuth()

  if (loading) return <TriangleLoader fullScreen />

  return isUserAuth ? <Router /> : <LoginRouter />
}

export default App
