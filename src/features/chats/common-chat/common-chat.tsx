import React, { useMemo } from 'react'
import {
  collection,
  DocumentData,
  orderBy,
  Query,
  query
} from 'firebase/firestore'

import { db } from '../../../configs/firebase-config'
import { useFirestoreQuery } from '../../../hooks/useFirestoreQuery'
import styles from './common-chat.module.scss'

export const CommonChat = () => {
  const messagesQuery: Query<DocumentData> = useMemo(
    () =>
      query(collection(db, 'common-chat-messages'), orderBy('sentTime', 'asc')),
    []
  )
  const { messagesSnapshot } = useFirestoreQuery(messagesQuery)

  return (
    <div className={styles.container}>
      <ul>
        {messagesSnapshot?.docs.map((doc) => (
          <li key={doc.id}>{doc.data().text}</li>
        ))}
      </ul>
    </div>
  )
}
