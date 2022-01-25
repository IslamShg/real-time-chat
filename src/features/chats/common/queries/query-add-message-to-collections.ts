import { addDoc, collection, Timestamp } from 'firebase/firestore'

import { db } from '../../../../configs/firebase-config'
import { MessageType } from '../../types'

type FuncArgs = {
  uid: string
  otherUserUid: string
  message: MessageType
}

export const addMessageToCollections = async ({
  uid,
  otherUserUid,
  message
}: FuncArgs) => {
  await Promise.all([
    addDoc(
      collection(db, `users/${uid}/chats/${otherUserUid}/messagesCollection`),
      { ...message, timestamp: Timestamp.now() }
    ),
    addDoc(
      collection(db, `users/${otherUserUid}/chats/${uid}/messagesCollection`),
      { ...message, timestamp: Timestamp.now() }
    )
  ])
}
