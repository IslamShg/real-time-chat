import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { userSlice } from './user-slice'
import { chatsSlice } from '../features/chats/chats-slice'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    chats: chatsSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
