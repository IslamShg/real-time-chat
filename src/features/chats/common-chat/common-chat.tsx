import React, { useMemo, useState } from 'react'
import {
  addDoc,
  collection,
  DocumentData,
  orderBy,
  Query,
  query,
  Timestamp
} from 'firebase/firestore'
import { useSelector } from 'react-redux'

import { ChatMessage, FixedInput } from '..'
import { db } from '../../../configs/firebase-config'
import { useFirestoreQuery } from '../../../hooks/useFirestoreQuery'
import { RootState } from '../../../slices/root-state'
import { MessageType } from '../types'
import styles from './common-chat.module.scss'

export const CommonChat = () => {
  const [messageInput, setMessageInput] = useState<string>('')
  const userData = useSelector((s: RootState) => s.user.userData)

  const messagesQuery: Query<DocumentData> = useMemo(
    () =>
      query(collection(db, 'common-chat-messages'), orderBy('sentTime', 'asc')),
    []
  )
  const { messagesSnapshot } = useFirestoreQuery(messagesQuery)

  const sendMessage = async (): Promise<void> => {
    if (!messageInput.length) return console.log('123')
    const message: MessageType = {
      authorName: userData.displayName,
      authorEmail: userData.email,
      isEdited: false,
      text: messageInput,
      sentTime: Timestamp.now()
    }

    setMessageInput('')
    await addDoc(collection(db, 'common-chat-messages'), message)
  }

  return (
    <div className={styles.container}>
      <div className={styles.messagesContainer}>
        {messagesSnapshot?.docs.map((doc) => (
          <ChatMessage key={doc.id} message={doc.data()} />
        ))}
      </div>
      <div className={styles.inputContainer}>
        <FixedInput
          onEnter={() => sendMessage()}
          value={messageInput}
          onChange={setMessageInput}
        />
      </div>
    </div>
  )
}
