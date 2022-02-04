import { bindActionCreators, createSlice } from '@reduxjs/toolkit'

import { useAppDispatch } from '../../../slices/root-state'
import { userDataType } from '../../../slices/types'
import { MessageType } from './types'

type State = {
  directChatMessages: MessageType[]
  receiverData: userDataType | null
}

const initialState: State = {
  directChatMessages: [],
  receiverData: null
}

export const chatsSlice = createSlice({
  name: 'chatsSlice',
  initialState,
  reducers: {
    setDirectChatMessages(state: State, { payload }) {
      state.directChatMessages = payload
    },
    addDirectMessage(state: State, { payload }) {
      state.directChatMessages.push(payload)
    },
    setReceiverData(state: State, { payload }) {
      state.receiverData = payload
    }
  }
})

export const useChatsActions = () => {
  const dispatch = useAppDispatch()
  return bindActionCreators({ ...chatsSlice.actions }, dispatch)
}
