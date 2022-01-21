export type userDataType = {
  uid: string
  displayName: string | null
  email: string | null
  phoneNumber: string | null
  photoURL: string | null
  chats?: any[]
  emailVerified?: boolean
  userMetadata?: {
    creationTime?: number
    createdAt?: string
    lastLoginAt?: string
    lastSignInTime?: string
    lastAuthTime?: number
  }
}
