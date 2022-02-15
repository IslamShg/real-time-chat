import React, { useEffect, useMemo, useState } from 'react'
import {
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc
} from 'firebase/firestore'
import { useSelector } from 'react-redux'

import { ChatLayout } from '..'
import { useFirestoreQuery } from '../../../shared/hooks/useFirestoreQuery'
import { db } from '../../../shared/configs/firebase-config'
import { RootState } from '../../../slices/root-state'
import { useChatsActions } from '../common/chats-slice'
import { userDataType } from '../../../slices/types'
import { useSendDirectMessage } from '../common/hooks/use-send-direct-message'

type Props = {
  otherUserUid: string
}

export const DirectChat: React.FC<Props> = ({ otherUserUid }) => {
  const [messageInput, setMessageInput] = useState<string>('')
  const [receiverDocSnap, setReceiverDocSnap] =
    useState<DocumentSnapshot<DocumentData>>()
  const [isChatExisting, setIsChatExisting] = useState<boolean>(false)

  const { directChatMessages } = useSelector((s: RootState) => s.chats)
  const { uid } = useSelector((s: RootState) => s.user.userData)
  const { setDirectChatMessages, setReceiverData } = useChatsActions()

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
    if (chatMessagesSnapshot?.docs) {
      const docsData = chatMessagesSnapshot?.docs.map((doc) => ({
        id: doc.data().id,
        authorAvatarUrl: doc.data().authorAvatarUrl,
        authorEmail: doc.data().authorEmail,
        authorName: doc.data().authorName,
        isEdited: doc.data().isEdited,
        sentTime: doc.data().timestamp.seconds,
        text: doc.data().text
      }))
      setDirectChatMessages(docsData)
    }

    const unsubscribe = onSnapshot(userChatDocRef, () =>
      setTimeout(markAsRead, 2500)
    )
    return () => unsubscribe()
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

  const sendMessage = useSendDirectMessage({
    partnerId: otherUserUid,
    partnerDocSnap: receiverDocSnap,
    setMessageInput,
    messageText: messageInput,
    partnerChatDocRef: receiverChatDocRef,
    isChatExisting
  })

  const markAsRead = async () => {
    await updateDoc(userChatDocRef, {
      unreads: []
    })
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
