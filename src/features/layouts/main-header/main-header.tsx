import React, { useEffect } from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import { signOut } from 'firebase/auth'
import { useSelector } from 'react-redux'

import defaultUserImage from '../../../assets/default-user-icon.jpg'
import { auth } from '../../../shared/configs/firebase-config'
import styles from './main-header.module.scss'
import { RootState } from '../../../slices/root-state'
import { useUserActionCreators } from '../../../slices/user-slice'
import { SettingsModal } from '../../user/settings-modal/settings-modal'

export const MainHeader = () => {
  const { userData, isSettingsModalVisible } = useSelector(
    (s: RootState) => s.user
  )
  const { setSettingsModal } = useUserActionCreators()

  useEffect(() => {
    document.body.style.overflow = isSettingsModalVisible ? 'hidden' : 'auto'
  }, [isSettingsModalVisible])

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <img src={defaultUserImage} className={styles.userAvatar} alt='' />
        <span className={styles.headerUsername}>
          {userData.displayName || userData.email}
        </span>
      </div>
      <div className={styles.icons}>
        <SettingsIcon
          className={styles.icon}
          onClick={() => setSettingsModal(true)}
        />
        <LogoutIcon
          onClick={() => {
            signOut(auth)
          }}
          className={styles.icon}
        />
      </div>

      {isSettingsModalVisible && <SettingsModal />}
    </header>
  )
}
