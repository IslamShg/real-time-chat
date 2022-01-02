import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/login-page'

const LoginRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<div> Register page</div>} />
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  </BrowserRouter>
)

export default LoginRouter
