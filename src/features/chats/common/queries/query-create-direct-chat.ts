import {
  doc,
  DocumentData,
  QueryDocumentSnapshot,
  setDoc
} from 'firebase/firestore'

import { db } from '../../../../shared/configs/firebase-config'

type FunctionArgs = {
  uid: string
  partnerId: string
  partnerDocSnap: QueryDocumentSnapshot<DocumentData>
  userDisplayName: string | null
  userEmail: string | null
}

export const createDirectChats = async ({
  uid,
  partnerId,
  partnerDocSnap,
  userEmail,
  userDisplayName
}: FunctionArgs) => {
  await Promise.all([
    setDoc(doc(db, `users/${uid}/chats`, partnerId), {
      receiverName: partnerDocSnap.data().displayName,
      receiverEmail: partnerDocSnap.data().email
    }),
    setDoc(doc(db, `users/${partnerId}/chats`, uid), {
      receiverEmail: userEmail,
      receiverName: userDisplayName
    })
  ])
}
