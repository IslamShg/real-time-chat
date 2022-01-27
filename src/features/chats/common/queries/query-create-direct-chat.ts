import {
  doc,
  DocumentData,
  QueryDocumentSnapshot,
  setDoc
} from 'firebase/firestore'

import { db } from '../../../../configs/firebase-config'

type FunctionArgs = {
  uid: string
  otherUserUid: string
  receiverDocSnap: QueryDocumentSnapshot<DocumentData>
  userDisplayName: string | null
  userEmail: string | null
}

export const createDirectChats = async ({
  uid,
  otherUserUid,
  receiverDocSnap,
  userEmail,
  userDisplayName
}: FunctionArgs) => {
  await Promise.all([
    setDoc(doc(db, `users/${uid}/chats`, otherUserUid), {
      receiverName: receiverDocSnap.data().displayName,
      receiverEmail: receiverDocSnap.data().email,
      unreads: []
    }),
    setDoc(doc(db, `users/${otherUserUid}/chats`, uid), {
      receiverEmail: userEmail,
      receiverName: userDisplayName,
      unreads: []
    })
  ])
}
