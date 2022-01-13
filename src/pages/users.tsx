import React, { useMemo } from 'react'
import { collection, orderBy, query } from 'firebase/firestore'

import { db } from '../configs/firebase-config'
import { UsersList } from '../features'
import { useFirestoreQuery } from '../hooks/useFirestoreQuery'

const Users = () => {
  const getUsersQuery = useMemo(
    () =>
      query(
        collection(db, 'users'),
        orderBy('userMetadata.creationTime', 'desc')
      ),
    []
  )
  const { snapshot, loading } = useFirestoreQuery(getUsersQuery)

  return !loading ? (
    <UsersList usersListSnapshot={snapshot} />
  ) : (
    <p>loading...</p>
  )
}

export default Users
