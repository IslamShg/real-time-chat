import { DocumentData } from 'firebase/firestore'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { RootState } from '../../../slices/root-state'
import defaultUserImage from '../../../assets/default-user-icon.jpg'
import { userDataType } from '../../../slices/types'
import styles from './user-card.module.scss'

type Props = {
  userData: userDataType | DocumentData
}

export const UserCard: React.FC<Props> = ({ userData }) => {
  const { uid } = useSelector((s: RootState) => s.user.userData)
  const userRegisterTime = new Date(
    userData.userMetadata.creationTime
  ).toDateString()
  const userLastLogin = new Date(
    userData.userMetadata.lastAuthTime
  ).toDateString()

  return (
    <div key={userData.uid} className={styles.card}>
      <div className={styles.cardLeft}>
        <img
          className={styles.avatarImg}
          src={userData.photoURL || defaultUserImage}
          alt=''
        />
        <div className={styles.userInfo}>
          <span className={styles.userName}>
            {userData.displayName || userData.email}
          </span>
          <div className={styles.userMetadata}>
            <span>Registered since: {userRegisterTime}</span>
            <span>Last login: {userLastLogin}</span>
          </div>
        </div>
      </div>
      <div className={styles.cardRight}>
        {uid !== userData.uid && (
          <Link className={styles.messageBtn} to={`message/${userData.uid}`}>
            Message
          </Link>
        )}
      </div>
    </div>
  )
}
