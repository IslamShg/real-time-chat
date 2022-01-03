import React, { Dispatch, SetStateAction } from 'react'

import styles from './fixed-input.module.scss'

type FixedInputProps = {
  value: string
  onChange: Dispatch<SetStateAction<string>>
  placeholder?: string
  onEnter?: () => void
}

export const FixedInput: React.FC<FixedInputProps> = ({
  value,
  onChange,
  placeholder,
  onEnter
}) => {
  return (
    <div className={styles.container}>
      <input
        onKeyDown={(e) => e.code === 'Enter' && onEnter?.()}
        className={styles.input}
        value={value}
        onChange={({ target }) => onChange(target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}
