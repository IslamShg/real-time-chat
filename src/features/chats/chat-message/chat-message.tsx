import React from 'react'
import { DocumentData } from 'firebase/firestore'

import defaultUserImage from '../../../assets/default-user-icon.jpg'
import styles from './chat-message.module.scss'

type ChatMessageProps = {
  message: DocumentData
}

const Component: React.FC<ChatMessageProps> = ({
  message: { text, authorName, authorEmail, photoURL, sentTime }
}) => {
  const time = new Date(sentTime).toLocaleTimeString('en')
  const date = new Date(sentTime).toLocaleDateString()

  return (
    <div className={styles.message}>
      <img
        className={styles.authorAvatar}
        src={photoURL || defaultUserImage}
        alt='avatar'
      />
      <div className={styles.messageInfo}>
        <div className={styles.messageInfoTop}>
          <p className={styles.authorName}>{authorName || authorEmail}</p>
          <p className={styles.messageSentTime}>
            {sentTime ? time + ' ' + date : ''}
          </p>
        </div>
        <p className={styles.messageText}>{text}</p>
      </div>
    </div>
  )
}

export const ChatMessage = React.memo(Component)
