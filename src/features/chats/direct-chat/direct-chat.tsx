import React, { useMemo, useState } from 'react'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  orderBy,
  query,
  setDoc,
  Timestamp
} from 'firebase/firestore'
import { useSelector } from 'react-redux'

import { ChatLayout } from '..'
import { useFirestoreQuery } from '../../../hooks/useFirestoreQuery'
import { db } from '../../../configs/firebase-config'
import { RootState } from '../../../slices/root-state'
import { MessageType } from '../types'

type Props = {
  otherUserUid: string
}

export const DirectChat: React.FC<Props> = ({ otherUserUid }) => {
  const [messageInput, setMessageInput] = useState<string>('')
  const { uid, displayName, photoURL, email } = useSelector(
    (s: RootState) => s.user.userData
  )

  const getChatMessagesQuery = useMemo(
    () =>
      query(
        collection(db, `users/${uid}/chats/${otherUserUid}/messagesCollection`),
        orderBy('sentTime', 'asc')
      ),
    [uid, otherUserUid]
  )
  const { snapshot: chatMessagesSnapshot, loading: messagesLoading } =
    useFirestoreQuery(getChatMessagesQuery)

  const sendMessage = async () => {
    if (!messageInput.length) return console.log('123')
    const message: MessageType = {
      authorName: displayName,
      authorEmail: email,
      isEdited: false,
      text: messageInput,
      sentTime: Timestamp.now(),
      authorAvatarUrl: photoURL
    }

    const receiverDocSnap = await getDoc(doc(db, 'users', otherUserUid))
    const chatDocSnap = await getDoc(
      doc(db, `users/${uid}/chats/${otherUserUid}`)
    )
    setMessageInput('')

    if (!chatDocSnap.exists() && receiverDocSnap.exists()) {
      await setDoc(doc(db, `users/${uid}/chats`, otherUserUid), {
        receiverName: receiverDocSnap.data().displayName,
        receiverEmail: receiverDocSnap.data().email
      })
      await setDoc(doc(db, `users/${otherUserUid}/chats`, uid), {
        receiverEmail: email,
        receiverName: displayName
      })
    }

    if (receiverDocSnap.exists()) {
      await addDoc(
        collection(db, `users/${uid}/chats/${otherUserUid}/messagesCollection`),
        message
      )
      await addDoc(
        collection(db, `users/${otherUserUid}/chats/${uid}/messagesCollection`),
        message
      )
    }
  }

  return (
    <ChatLayout
      sendMessage={sendMessage}
      inputValue={messageInput}
      onValueChange={setMessageInput}
      loading={messagesLoading}
      chatMessagesSnapshot={chatMessagesSnapshot}
    />
  )
}
