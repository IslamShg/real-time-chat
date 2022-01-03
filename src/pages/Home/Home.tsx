import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { CommonChat, MainHeader, MainSidebar } from '../../features'
import styles from './home.module.scss'

export const Home = () => {
  return (
    <div className={styles.container}>
      <MainHeader />
      <div className={styles.contentWrapper}>
        <MainSidebar />
        <div className={styles.content}>
          <Routes>
            <Route path='/common' element={<CommonChat />} />
            <Route path='*' element={<Navigate to='/common' />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
