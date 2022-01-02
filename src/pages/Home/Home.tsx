import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../configs/firebase-config'

import { MainHeader } from '../../features'

export const Home = () => {
  return (
    <div>
      <MainHeader />
      <button
        onClick={() => {
          signOut(auth)
        }}
      >
        Sign out
      </button>
    </div>
  )
}
