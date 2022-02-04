import { addDoc, collection, Timestamp } from 'firebase/firestore'

import { db } from '../../../../shared/configs/firebase-config'
import { MessageType } from '../types'

type FuncArgs = {
  uid: string
  partnerId: string
  message: MessageType
}

export const addMessageToCollections = async ({
  uid,
  partnerId,
  message
}: FuncArgs) => {
  await Promise.all([
    addDoc(
      collection(db, `users/${uid}/chats/${partnerId}/messagesCollection`),
      { ...message, timestamp: Timestamp.now() }
    ),
    addDoc(
      collection(db, `users/${partnerId}/chats/${uid}/messagesCollection`),
      { ...message, timestamp: Timestamp.now() }
    )
  ])
}
