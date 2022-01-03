import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home/Home'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Home />} />
        <Route path='*' element={<Navigate to='/common' />} />
        <Route path='/' element={<Navigate to='/common' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
