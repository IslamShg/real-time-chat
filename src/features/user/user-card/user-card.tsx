import { DocumentData } from 'firebase/firestore'
import React from 'react'

import { userDataType } from '../../../slices/types'
import styles from './user-card.module.scss'

type Props = {
  userData: userDataType | DocumentData
}

export const UserCard: React.FC<Props> = ({ userData }) => {
  console.log(userData)
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
          src='https://dmitrovipoteka.ru/wp-content/uploads/2016/09/default-user-img.jpg'
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
    </div>
  )
}
