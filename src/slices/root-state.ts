import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { MainSlice } from './main-slice/main-slice'

export const store = configureStore({
  reducer: {
    main: MainSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
