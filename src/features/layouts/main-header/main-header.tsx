import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
import { signOut } from 'firebase/auth'
import { useSelector } from 'react-redux'

import defaultUserImage from '../../../assets/default-user-icon.jpg'
import { auth } from '../../../configs/firebase-config'
import styles from './main-header.module.scss'
import { RootState } from '../../../slices/root-state'

export const MainHeader = () => {
  const user = useSelector((s: RootState) => s.user.userData)

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <img src={defaultUserImage} className={styles.userAvatar} alt='' />
        <span className={styles.headerUsername}>
          {user.displayName || user.email}
        </span>
      </div>
      <LogoutIcon
        onClick={() => {
          signOut(auth)
        }}
        className={styles.logoutIcon}
      />
    </header>
  )
}
