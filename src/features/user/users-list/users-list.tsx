import React from 'react'
import { DocumentData, QuerySnapshot } from 'firebase/firestore'

import styles from './users-list.module.scss'
import { UserCard } from '..'

type UsersListProps = {
  usersListSnapshot?: QuerySnapshot<DocumentData>
}

export const UsersList: React.FC<UsersListProps> = ({ usersListSnapshot }) => {
  return (
    <div className={styles.container}>
      {usersListSnapshot?.docs.map((doc) => (
        <UserCard key={doc.id} userData={doc.data()} />
      ))}
    </div>
  )
}
