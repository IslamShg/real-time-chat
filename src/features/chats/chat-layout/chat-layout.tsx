import React, { useEffect, useRef } from 'react'
import { DocumentData, QuerySnapshot } from 'firebase/firestore'

import { ChatMessage, FixedInput } from '..'
import { MessageType } from '../common/types'
import styles from './chat-layout.module.scss'
import { userDataType } from '../../../slices/types'
import { TriangleLoader } from '../../../shared/ui'

type Props = {
  receiverData?: userDataType
  loading?: boolean
  sendMessage: () => Promise<void>
  commonMessagesSnapshot?: QuerySnapshot<DocumentData>
  inputValue: string
  onValueChange: (val: string) => void
  chatMessages?: MessageType[]
}

export const ChatLayout: React.FC<Props> = ({
  receiverData,
  loading,
  sendMessage,
  commonMessagesSnapshot,
  chatMessages,
  inputValue,
  onValueChange
}) => {
  const messagesContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const scrollHeight = messagesContainerRef.current?.scrollHeight || 0
    messagesContainerRef.current?.scrollTo(0, scrollHeight)
  }, [chatMessages, commonMessagesSnapshot])

  if (loading)
    return (
      <div className={styles.loaderWrapper}>
        <TriangleLoader />
      </div>
    )

  return (
    <div className={styles.container}>
      {receiverData ? (
        <div className={styles.receiverInfo}>
          <span className={styles.receiverName}>
            {receiverData?.displayName || receiverData?.email}
          </span>
        </div>
      ) : (
        <div className={styles.receiverInfo}>
          <span className={styles.receiverName}>Common chat</span>
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.messagesContainer} ref={messagesContainerRef}>
          {commonMessagesSnapshot
            ? commonMessagesSnapshot?.docs.map((doc) => (
                <ChatMessage key={doc.id} message={doc.data()} />
              ))
            : chatMessages?.map((message) => (
                <ChatMessage key={message.id} message={message} />
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
    </div>
  )
}
