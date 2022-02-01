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

import { ChatLayout } from '..'
import { db } from '../../../shared/configs/firebase-config'
import { useFirestoreQuery } from '../../../hooks/useFirestoreQuery'
import { RootState } from '../../../slices/root-state'
import { MessageType } from '../common/types'

export const CommonChat = () => {
  const [messageInput, setMessageInput] = useState<string>('')
  const userData = useSelector((s: RootState) => s.user.userData)

  const messagesQuery: Query<DocumentData> = useMemo(
    () =>
      query(collection(db, 'common-chat-messages'), orderBy('sentTime', 'asc')),
    []
  )
  const { snapshot, loading } = useFirestoreQuery(messagesQuery)

  const sendMessage = async (): Promise<void> => {
    if (!messageInput.length) return
    const message: MessageType = {
      authorName: userData.displayName,
      authorEmail: userData.email,
      isEdited: false,
      text: messageInput,
      sentTime: Timestamp.now(),
      authorAvatarUrl: userData.photoURL
    }

    setMessageInput('')
    await addDoc(collection(db, 'common-chat-messages'), message)
  }

  return (
    <ChatLayout
      loading={loading}
      onValueChange={setMessageInput}
      sendMessage={sendMessage}
      commonMessagesSnapshot={snapshot}
      inputValue={messageInput}
    />
  )
}
