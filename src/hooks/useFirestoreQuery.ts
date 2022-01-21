import {
  DocumentData,
  onSnapshot,
  Query,
  QuerySnapshot
} from 'firebase/firestore'
import { useEffect, useState } from 'react'

export const useFirestoreQuery = (query: Query<DocumentData>) => {
  const [snapshot, setSnapshot] = useState<QuerySnapshot<DocumentData>>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsub = onSnapshot(query, (sn) => {
      setLoading(false)
      setSnapshot(sn)
    })
    return () => unsub()
  }, [query])

  return { snapshot, loading }
}
