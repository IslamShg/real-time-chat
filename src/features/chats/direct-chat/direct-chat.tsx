import React, { useEffect, useMemo, useState } from 'react'
import {
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  orderBy,
  query
} from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { nanoid } from 'nanoid'

import { ChatLayout } from '..'
import { useFirestoreQuery } from '../../../hooks/useFirestoreQuery'
import { db } from '../../../configs/firebase-config'
import { RootState } from '../../../slices/root-state'
import { MessageType } from '../common/types'
import { useChatsActions } from '../chats-slice'
import { addMessageToCollections, createDirectChats } from '../common'
import { userDataType } from '../../../slices/types'

type Props = {
  otherUserUid: string
}

export const DirectChat: React.FC<Props> = ({ otherUserUid }) => {
  const [messageInput, setMessageInput] = useState<string>('')
  const [receiverDocSnap, setReceiverDocSnap] =
    useState<DocumentSnapshot<DocumentData>>()
  const { uid, displayName, photoURL, email } = useSelector(
    (s: RootState) => s.user.userData
  )
  const [isChatExisting, setIsChatExisting] = useState<boolean>(false)

  const { directChatMessages } = useSelector((s: RootState) => s.chats)
  const { setDirectChatMessages, addDirectMessage, setReceiverData } =
    useChatsActions()

  const getChatMessagesQuery = useMemo(
    () =>
      query(
        collection(db, `users/${uid}/chats/${otherUserUid}/messagesCollection`),
        orderBy('timestamp', 'asc')
      ),
    [uid, otherUserUid]
  )
  const { snapshot: chatMessagesSnapshot, loading: messagesLoading } =
    useFirestoreQuery(getChatMessagesQuery)

  useEffect(() => {
    if (chatMessagesSnapshot?.docs) {
      const docsData = chatMessagesSnapshot?.docs.map((doc) => {
        return {
          id: doc.data().id,
          authorAvatarUrl: doc.data().authorAvatarUrl,
          authorEmail: doc.data().authorEmail,
          authorName: doc.data().authorName,
          isEdited: doc.data().isEdited,
          sentTime: doc.data().timestamp.seconds,
          text: doc.data().text
        }
      })
      setDirectChatMessages(docsData)
    }
  }, [chatMessagesSnapshot])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const getReceiverData = async () => {
      const sn = await getDoc(doc(db, 'users', otherUserUid))
      setReceiverDocSnap(sn)
      setReceiverData(sn.data())
    }
    const checkIsChatExists = async () => {
      const chatDocSnap = await getDoc(
        doc(db, `users/${uid}/chats/${otherUserUid}`)
      )
      chatDocSnap.exists() ? setIsChatExisting(true) : setIsChatExisting(false)
    }

    checkIsChatExists()
    getReceiverData()
  }, [otherUserUid])

  console.log(isChatExisting)

  const sendMessage = async () => {
    if (!messageInput.length) return
    const message: MessageType = {
      id: nanoid(),
      authorName: displayName,
      authorEmail: email,
      isEdited: false,
      text: messageInput,
      sentTime: Date.now(),
      authorAvatarUrl: photoURL
    }
    addDirectMessage(message)
    setMessageInput('')

    if (!isChatExisting && receiverDocSnap?.exists()) {
      await createDirectChats({
        uid,
        otherUserUid,
        receiverDocSnap,
        userEmail: email,
        userDisplayName: displayName
      })
    }
    if (receiverDocSnap?.exists()) {
      await addMessageToCollections({ uid, otherUserUid, message })
    }
  }

  return (
    <ChatLayout
      receiverData={receiverDocSnap?.data() as userDataType}
      sendMessage={sendMessage}
      inputValue={messageInput}
      onValueChange={setMessageInput}
      loading={messagesLoading}
      chatMessages={directChatMessages}
    />
  )
}
