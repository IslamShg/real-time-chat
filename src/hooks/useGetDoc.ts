import { useEffect, useState } from 'react'
import { doc, DocumentData, DocumentSnapshot, getDoc } from 'firebase/firestore'
import { db } from '../shared/configs/firebase-config'

export const useGetDoc = (collectionName: string, docId: string) => {
  const [document, setDocument] =
    useState<DocumentSnapshot<DocumentData> | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchDoc = async () => {
      const document = await getDoc(doc(db, collectionName, docId))
      setDocument(document)
      setLoading(false)
    }
    fetchDoc()
  }, [collectionName, docId])

  return { document, loading }
}
