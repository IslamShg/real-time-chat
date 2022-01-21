import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Users from '../users'
import { CommonChat, MainHeader, MainSidebar } from '../../features'
import { DirectMessages } from '../direct-messages'
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
            <Route path='/users' element={<Users />} />
            <Route path='/users/message/:uid' element={<DirectMessages />} />
            <Route path='*' element={<Navigate to='/common' />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
