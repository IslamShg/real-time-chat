import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { firebaseConfigType } from './types'

export const firebaseConfig: firebaseConfigType = {
  apiKey: 'AIzaSyDtvOEJZDmz1Z3n8i0UIeBXlYdRJD7Mg0Y',
  authDomain: 'side-proj-c6635.firebaseapp.com',
  projectId: 'side-proj-c6635',
  storageBucket: 'side-proj-c6635.appspot.com',
  messagingSenderId: '440113363758',
  appId: '1:440113363758:web:162996b565e52d8424d8bf'
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
