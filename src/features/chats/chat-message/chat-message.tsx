import React from 'react'
import { DocumentData } from 'firebase/firestore'

import styles from './chat-message.module.scss'

type ChatMessageProps = {
  message: DocumentData
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message: { text }
}) => {
  return <div className={styles.message}>{text}</div>
}
