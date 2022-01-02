import { createSlice } from '@reduxjs/toolkit'
import { TypeState } from '../types'

const initialState: TypeState = {
  isLoading: false
}

export const MainSlice = createSlice({
  name: 'main-slice',
  initialState,
  reducers: {}
})
