import { collection, query } from 'firebase/firestore'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { RootState } from '../../../slices/root-state'
import { db } from '../../../configs/firebase-config'
import { useFirestoreQuery } from '../../../hooks/useFirestoreQuery'
import styles from './main-sidebar.module.scss'

export const MainSidebar = () => {
  const { uid } = useSelector((s: RootState) => s.user.userData)
  const getChatsQuery = useMemo(
    () => query(collection(db, `users/${uid}/chats`)),
    [uid]
  )
  const { snapshot } = useFirestoreQuery(getChatsQuery)

  return (
    <div className={styles.sidebar}>
      <div className={styles.linksGroup}>
        <span className={styles.groupTitle}>Chats 💬</span>
        <Link to='/common'># Common chat</Link>
        {snapshot?.docs.map((doc) => (
          <Link
            key={doc.id}
            to={`/users/message/${doc.id}`}
            className={styles.chatLink}
          >
            <span className={styles.chatName}>
              # {doc.data().receiverName || doc.data().receiverEmail}
              {doc?.data()?.unreads?.length > 0 && (
                <span className={styles.chatBadge}>
                  {doc.data().unreads.length}
                </span>
              )}
            </span>
          </Link>
        ))}
      </div>
      <div className={styles.linksGroup}>
        <Link to='/users'># users</Link>
      </div>
    </div>
  )
}
