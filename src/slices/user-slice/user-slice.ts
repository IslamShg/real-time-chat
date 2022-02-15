import { bindActionCreators, createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { userDataType } from '../types'

type userStateType = {
  userData: userDataType
  isSettingsModalVisible: boolean
}

const initialState: userStateType = {
  userData: {
    uid: '',
    displayName: null,
    email: null,
    phoneNumber: null,
    photoURL: null
  },
  isSettingsModalVisible: false
}

export const userSlice = createSlice({
  name: 'user-slice',
  initialState,
  reducers: {
    setUserData(state: userStateType, { payload }): void {
      state.userData = { ...state.userData, ...payload }
    },
    setSettingsModal(state: userStateType, { payload }): void {
      state.isSettingsModalVisible = payload
    }
  }
})

export const useUserActionCreators = () => {
  const dispatch = useDispatch()
  return bindActionCreators({ ...userSlice.actions }, dispatch)
}
