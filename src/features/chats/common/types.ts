import { Timestamp } from 'firebase/firestore'

export type MessageType = {
  id?: number | string
  authorName: string | null
  sentTime: number
  isEdited: boolean
  text: string
  authorEmail: string | null
  authorAvatarUrl?: string | null
  timestamp?: Timestamp
}

export type ChatType = {
  receiverEmail: string | null
  receiverName: string | null
  messages: MessageType[]
}
