import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { useUserActionCreators } from '../../slices/user-slice'
import { auth, db } from '../configs/firebase-config'

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isUserAuth, setIsUserAuth] = useState<boolean | null>(null)
  const { setUserData } = useUserActionCreators()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { uid } = user
        const userDocRef = doc(db, 'users', uid)
        const docSnap = await getDoc(userDocRef)

        if (docSnap.exists()) {
          const { displayName, email, phoneNumber, photoURL, userMetadata } =
            docSnap.data()
          await updateDoc(userDocRef, {
            userMetadata: { ...userMetadata, lastAuthTime: Date.now() }
          })
          setUserData({
            uid,
            displayName,
            email,
            phoneNumber,
            photoURL
          })
        }

        setIsUserAuth(true)
        setLoading(false)
        return
      }
      setLoading(false)
      setIsUserAuth(false)
    })
  }, [setUserData])

  return { loading, isUserAuth }
}
