import React, { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { Form, Formik, FormikProps } from 'formik'

import { validation } from '../login-validation'
import { LoginInput } from '../login-input'
import { auth } from '../../../configs/firebase-config'
import { useUserActionCreators } from '../../../slices/user-slice'
import styles from './login-form.module.scss'

type FormValuesType = {
  email: string
  password: string
}

export const LoginForm = () => {
  const [authType, setAuthType] = useState<'signIn' | 'signUp'>('signIn')
  const [signInError, setSignInError] = useState<string | null>(null)
  const { setUserData } = useUserActionCreators()

  const signIn = async ({ email, password }: FormValuesType): Promise<void> => {
    try {
      const userCreds = await signInWithEmailAndPassword(auth, email, password)
      const {
        uid,
        displayName,
        email: userEmail,
        phoneNumber,
        photoURL
      } = userCreds.user

      setUserData({ uid, displayName, phoneNumber, photoURL, email: userEmail })
    } catch (e) {
      if (e.code === 'auth/user-not-found') {
        setSignInError('An account with such an email was not found')
      } else
        setSignInError(
          'An error happened. Please, check the given input and try again'
        )
    }
  }

  const signUp = async ({ email, password }: FormValuesType): Promise<void> => {
    const user = await createUserWithEmailAndPassword(auth, email, password)
    console.log('user: ', user)
  }

  return (
    <Formik
      onSubmit={authType === 'signIn' ? signIn : signUp}
      initialValues={{ email: '', password: '' }}
      validationSchema={validation}
    >
      {(formik: FormikProps<FormValuesType>) => {
        return (
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <div className={styles.containerTop}>
                <p className={styles.title}>
                  {authType === 'signIn' ? 'Sign in' : 'Sign up'}
                </p>
              </div>
              {signInError && (
                <p className={styles.signInError}>{signInError}</p>
              )}
              <Form className={styles.formContainer}>
                <div className={styles.inputWrapper}>
                  <p className={styles.inputLabel}>Email</p>
                  <LoginInput
                    name='email'
                    placeholder='Enter your email'
                    type='email'
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <p className={styles.inputLabel}>Password</p>
                  <LoginInput
                    name='password'
                    placeholder='Enter your password'
                    type='password'
                  />
                </div>
                <button
                  onClick={() => formik.handleSubmit}
                  className={styles.signInBtn}
                  type='submit'
                >
                  Sign In
                </button>
                {/* <button className={styles.googleSignInBtn} type='submit'>
                  <GoogleIcon />
                  <span>Sign in with Google</span>
                </button> */}
                {authType === 'signIn' ? (
                  <button
                    className={styles.askBtn}
                    type='button'
                    onClick={() => {
                      formik.resetForm()
                      setAuthType('signUp')
                    }}
                  >
                    {"Don't have an account?"}
                  </button>
                ) : (
                  <button
                    className={styles.askBtn}
                    type='button'
                    onClick={() => setAuthType('signIn')}
                  >
                    Already have an account?
                  </button>
                )}
              </Form>
            </div>
          </div>
        )
      }}
    </Formik>
  )
}
