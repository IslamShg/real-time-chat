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
  const [snapshotUpdated, setSnapshotUpdated] = useState(false)

  useEffect(() => {
    const unsubscribe = onSnapshot(query, (sn) => {
      setLoading(false)
      setSnapshotUpdated(true)
      setSnapshot(sn)
    })
    return () => unsubscribe()
  }, [query])

  return { snapshot, loading, snapshotUpdated }
}
