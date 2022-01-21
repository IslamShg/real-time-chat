import React from 'react'
import { useParams } from 'react-router-dom'

import { DirectChat } from '../features'

export const DirectMessages = () => {
  const { uid } = useParams()

  return uid ? <DirectChat otherUserUid={uid} /> : <p>Пользователь не найден</p>
}
