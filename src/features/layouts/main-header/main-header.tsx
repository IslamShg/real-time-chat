import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
import { signOut } from 'firebase/auth'

import defaultUserImage from '../../../assets/default-user-icon.jpg'
import { auth } from '../../../configs/firebase-config'
import styles from './main-header.module.scss'

export const MainHeader = () => {
  return (
    <header className={styles.header}>
      <img src={defaultUserImage} className={styles.userAvatar} alt='' />
      <LogoutIcon
        onClick={() => {
          signOut(auth)
        }}
        className={styles.logoutIcon}
      />
    </header>
  )
}
