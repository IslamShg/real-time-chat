import React from 'react'
import { useField } from 'formik'

import styles from './login-input.module.scss'

type LoginInputProps = {
  name: string
  placeholder?: string
  type?: string
}

export const LoginInput: React.FC<LoginInputProps> = (props) => {
  const [field, meta] = useField({ name: props.name })
  const isError = meta.touched && meta.error

  return (
    <>
      <input {...props} {...field} className={styles.input} />
      {isError && <p className={styles.validationError}>{meta.error}</p>}
    </>
  )
}
