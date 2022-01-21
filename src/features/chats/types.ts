import { Timestamp } from 'firebase/firestore'

export type MessageType = {
  id?: number
  authorName: string | null
  sentTime: Timestamp
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
