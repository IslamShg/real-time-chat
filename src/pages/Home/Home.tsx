import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../configs/firebase-config'

export const Home = () => {
  return (
    <div>
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
