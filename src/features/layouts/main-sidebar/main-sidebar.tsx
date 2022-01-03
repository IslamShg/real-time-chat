import React from 'react'
import { Link } from 'react-router-dom'

import styles from './main-sidebar.module.scss'

export const MainSidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.linksGroup}>
        <span className={styles.groupTitle}>Chats 💬</span>
        <Link to='common'># Common chat</Link>
      </div>
    </div>
  )
}
