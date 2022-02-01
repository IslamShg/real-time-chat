import { nanoid } from 'nanoid'
import { DocumentSnapshot, DocumentData, doc, getDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'

import { db } from '../../../../shared/configs/firebase-config'
import { useChatsActions } from '../chats-slice'
import { addMessageToCollections, createDirectChats } from '../queries'
import { MessageType } from '../types'
import { RootState } from '../../../../slices/root-state'

type Props = {
  partnerId: string
  messageText: string
  partnerDocSnap?: DocumentSnapshot<DocumentData>
  setMessageInput: (val: string) => void
}

export const useSendDirectMessage = ({
  partnerId,
  messageText,
  partnerDocSnap,
  setMessageInput
}: Props) => {
  const { addDirectMessage } = useChatsActions()
  const { uid, displayName, photoURL, email } = useSelector(
    (s: RootState) => s.user.userData
  )

  return async () => {
    if (!messageText.length) return
    const message: MessageType = {
      id: nanoid(),
      authorName: displayName,
      authorEmail: email,
      isEdited: false,
      text: messageText,
      sentTime: Date.now(),
      authorAvatarUrl: photoURL
    }
    addDirectMessage(message)
    setMessageInput('')

    const docRef = doc(db, `users/${uid}/chats/${partnerId}`)
    const chatDocSnap = await getDoc(docRef)

    if (!chatDocSnap.exists() && partnerDocSnap?.exists()) {
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
  }
}
