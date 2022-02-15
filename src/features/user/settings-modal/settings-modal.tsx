import React from 'react'
import CloseIcon from '@mui/icons-material/Close'

import { useUserActionCreators } from '../../../slices/user-slice'
import styles from './settings-modal.module.scss'

export const SettingsModal = () => {
  const { setSettingsModal } = useUserActionCreators()

  return (
    <>
      <div
        className={styles.overlay}
        role='button'
        tabIndex={0}
        onKeyPress={() => null}
        onClick={(e) => {
          setSettingsModal(false)
          e.stopPropagation()
        }}
      />
      <div className={styles.modal}>
        <CloseIcon
          className={styles.closeIcon}
          onClick={() => setSettingsModal(false)}
        />
      </div>
    </>
  )
}
