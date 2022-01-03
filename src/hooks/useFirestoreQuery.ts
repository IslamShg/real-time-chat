import {
  DocumentData,
  onSnapshot,
  Query,
  QuerySnapshot
} from 'firebase/firestore'
import { useEffect, useState } from 'react'

export const useFirestoreQuery = (query: Query<DocumentData>) => {
  const [messages, setMessages] = useState<QuerySnapshot<DocumentData>>()

  useEffect(() => {
    const unsub = onSnapshot(query, (sn) => setMessages(sn))
    return () => unsub()
  }, [query])

  return { messagesSnapshot: messages }
}
