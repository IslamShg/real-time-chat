import React, { useMemo, useState } from 'react'
import { collection, query } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { RootState } from '../../../slices/root-state'
import { db } from '../../../shared/configs/firebase-config'
import { useFirestoreQuery } from '../../../shared/hooks/useFirestoreQuery'
import styles from './main-sidebar.module.scss'

export const MainSidebar = () => {
  const [isChatsDropdownOpened, setIsChatsDropdownOpened] = useState(true)
  const { uid } = useSelector((s: RootState) => s.user.userData)
  const getChatsQuery = useMemo(
    () => query(collection(db, `users/${uid}/chats`)),
    [uid]
  )
  const { snapshot } = useFirestoreQuery(getChatsQuery)

  return (
    <div className={styles.sidebar}>
      <div className={styles.linksGroup}>
        <div className={styles.linksGroupHeader}>
          <span className={styles.groupTitle}>Chats 💬</span>
          {isChatsDropdownOpened ? (
            <KeyboardArrowUpIcon
              onClick={() => setIsChatsDropdownOpened(false)}
              color='inherit'
              className={styles.chevronIcon}
            />
          ) : (
            <KeyboardArrowDownIcon
              onClick={() => setIsChatsDropdownOpened(true)}
              color='inherit'
              className={styles.chevronIcon}
            />
          )}
        </div>
        {isChatsDropdownOpened && (
          <div className={styles.linksList}>
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
        )}
      </div>
      <div className={styles.linksGroup}>
        <Link to='/users'># users</Link>
      </div>
      {/* <div className={styles.linksGroup}>
        <Link to='/movies'># movies</Link>
      </div> */}
    </div>
  )
}
