import React from 'react'
import { DocumentData } from 'firebase/firestore'

import defaultUserImage from '../../../assets/default-user-icon.jpg'
import styles from './chat-message.module.scss'

type ChatMessageProps = {
  message: DocumentData
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message: { text, authorName, authorEmail, photoURL, sentTime }
}) => {
  const time = new Date(sentTime?.toDate()).toTimeString().slice(0, 5)
  const date = new Date(sentTime?.toDate()).toDateString().slice(4, 10)

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
