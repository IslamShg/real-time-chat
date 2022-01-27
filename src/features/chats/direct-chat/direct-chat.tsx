import React, { useEffect, useMemo, useState } from 'react'
import {
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  orderBy,
  query,
  updateDoc
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
  const [isChatExisting, setIsChatExisting] = useState<boolean>(false)

  const { directChatMessages } = useSelector((s: RootState) => s.chats)
  const { uid, displayName, photoURL, email } = useSelector(
    (s: RootState) => s.user.userData
  )
  const { setDirectChatMessages, addDirectMessage, setReceiverData } =
    useChatsActions()

  const receiverChatDocRef = doc(db, `users/${otherUserUid}/chats/${uid}`)
  const userChatDocRef = doc(db, `users/${uid}/chats/${otherUserUid}`)

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
    markAsRead()
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
      const chatDocSnap = await getDoc(userChatDocRef)
      chatDocSnap.exists() ? setIsChatExisting(true) : setIsChatExisting(false)
    }

    checkIsChatExists()
    getReceiverData()
  }, [otherUserUid])

  const markAsRead = async () => {
    await updateDoc(userChatDocRef, {
      unreads: []
    })
  }

  const sendMessage = async () => {
    if (!messageInput.length) return
    const id = nanoid()
    const message: MessageType = {
      id,
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

      const receiverChatDocSnap = await getDoc(receiverChatDocRef)
      if (receiverChatDocSnap.exists()) {
        await updateDoc(receiverChatDocRef, {
          unreads: [...receiverChatDocSnap.data().unreads, { messageId: id }]
        })
      }
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
