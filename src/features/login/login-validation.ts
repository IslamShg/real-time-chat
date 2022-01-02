import * as Yup from 'yup'

export const validation = Yup.object({
  email: Yup.string().email().required('Required field'),
  password: Yup.string()
    .required('Required field')
    .min(6, 'Password should be at least 6 characters')
})
