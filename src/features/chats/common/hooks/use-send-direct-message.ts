import { nanoid } from 'nanoid'
import {
  DocumentSnapshot,
  DocumentData,
  getDoc,
  updateDoc,
  DocumentReference
} from 'firebase/firestore'
import { useSelector } from 'react-redux'

import { useChatsActions } from '../chats-slice'
import { addMessageToCollections, createDirectChats } from '../queries'
import { MessageType } from '../types'
import { RootState } from '../../../../slices/root-state'

type Props = {
  partnerId: string
  messageText: string
  partnerDocSnap?: DocumentSnapshot<DocumentData>
  setMessageInput: (val: string) => void
  partnerChatDocRef: DocumentReference<DocumentData>
  isChatExisting: boolean
}

export const useSendDirectMessage = ({
  partnerId,
  messageText,
  partnerDocSnap,
  setMessageInput,
  partnerChatDocRef,
  isChatExisting
}: Props) => {
  const { addDirectMessage } = useChatsActions()
  const { uid, displayName, photoURL, email } = useSelector(
    (s: RootState) => s.user.userData
  )

  return async () => {
    if (!messageText.length) return

    const id = nanoid()
    const message: MessageType = {
      id,
      authorName: displayName,
      authorEmail: email,
      isEdited: false,
      text: messageText,
      sentTime: Date.now(),
      authorAvatarUrl: photoURL
    }
    addDirectMessage(message)
    setMessageInput('')

    if (!isChatExisting && partnerDocSnap?.exists()) {
      await createDirectChats({
        uid,
        partnerId,
        partnerDocSnap,
        userEmail: email,
        userDisplayName: displayName
      })
    }

    if (partnerDocSnap?.exists()) {
      await addMessageToCollections({ uid, partnerId, message })
    }

    const partnerChatDocSnap = await getDoc(partnerChatDocRef)
    if (partnerChatDocSnap?.exists()) {
      await updateDoc(partnerChatDocRef, {
        unreads: [...partnerChatDocSnap?.data().unreads, { messageId: id }]
      })
    }
  }
}
