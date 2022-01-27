import { Timestamp } from 'firebase/firestore'

export type MessageType = {
  id?: number | string
  authorName: string | null
  sentTime: Timestamp | string | number
  isEdited: boolean
  text: string
  authorEmail: string | null
  authorAvatarUrl?: string | null
}

export type ChatType = {
  receiverEmail: string | null
  receiverName: string | null
  messages: MessageType[]
}
