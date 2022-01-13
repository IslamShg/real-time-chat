export type userDataType = {
  uid: string | null
  displayName: string | null
  email: string | null
  phoneNumber: string | null
  photoURL: string | null
  emailVerified?: boolean
  userMetadata?: {
    creationTime?: number
    createdAt?: string
    lastLoginAt?: string
    lastSignInTime?: string
    lastAuthTime?: number
  }
}
