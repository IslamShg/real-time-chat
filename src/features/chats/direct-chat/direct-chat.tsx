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

import { ChatLayout } from '..'
import { useFirestoreQuery } from '../../../hooks/useFirestoreQuery'
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
  const { uid } = useSelector((s: RootState) => s.user.userData)
  const { directChatMessages } = useSelector((s: RootState) => s.chats)
  const { setDirectChatMessages, setReceiverData } = useChatsActions()

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
  }, [chatMessagesSnapshot])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const getReceiverData = async () => {
      const sn = await getDoc(doc(db, 'users', otherUserUid))
      setReceiverDocSnap(sn)
      setReceiverData(sn.data())
    }
    getReceiverData()
  }, [otherUserUid])

  const sendMessage = useSendDirectMessage({
    partnerId: otherUserUid,
    partnerDocSnap: receiverDocSnap,
    setMessageInput,
    messageText: messageInput
  })

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
