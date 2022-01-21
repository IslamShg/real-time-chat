import React, { useEffect, useRef } from 'react'
import { DocumentData, QuerySnapshot } from 'firebase/firestore'

import { ChatMessage, FixedInput } from '..'
import styles from './chat-layout.module.scss'

type Props = {
  loading?: boolean
  sendMessage: () => Promise<void>
  commonMessagesSnapshot?: QuerySnapshot<DocumentData>
  inputValue: string
  onValueChange: (val: string) => void
  chatMessagesSnapshot?: QuerySnapshot<DocumentData>
}

export const ChatLayout: React.FC<Props> = ({
  loading,
  sendMessage,
  commonMessagesSnapshot,
  chatMessagesSnapshot,
  inputValue,
  onValueChange
}) => {
  const messagesContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const scrollHeight = messagesContainerRef.current?.scrollHeight || 0
    messagesContainerRef.current?.scrollTo(0, scrollHeight)
  }, [commonMessagesSnapshot, chatMessagesSnapshot])

  if (loading) return <p>...loading</p>

  return (
    <div className={styles.container}>
      <div className={styles.messagesContainer} ref={messagesContainerRef}>
        {commonMessagesSnapshot
          ? commonMessagesSnapshot?.docs.map((doc) => (
              <ChatMessage key={doc.id} message={doc.data()} />
            ))
          : chatMessagesSnapshot?.docs.map((doc) => (
              <ChatMessage key={doc.id} message={doc.data()} />
            ))}
      </div>
      <div className={styles.inputContainer}>
        <FixedInput
          onEnter={() => sendMessage()}
          value={inputValue}
          onChange={onValueChange}
        />
      </div>
    </div>
  )
}
