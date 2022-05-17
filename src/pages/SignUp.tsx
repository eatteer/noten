import { Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { InputField } from '../components/InputField'
import { toastSuccessOptions } from '../components/toast/options'
import {
  determineUserExistenceByUsername,
  registerUser,
} from '../services/users-services'

export const SignUp = () => {
  // console.log('Rendering SignUp') 

  /* Hooks */
  const navigate = useNavigate()

  /* Handlers */
  const onNavigateToSignIn = () => {
    navigate('/signin')
  }

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validate={async ({ username, password }) => {
        let errors: any = {}
        if (!username) {
          errors.username = 'Required'
        }
        if (username) {
          try {
            const user = await determineUserExistenceByUsername(username)
            if (user) {
              errors.username = 'Username already exists'
            }
          } catch (error: any) {
            console.error(error.cause)
          }
        }
        if (!password) {
          errors.password = 'Required'
        }
        return errors
      }}
      onSubmit={async (values) => {
        const { username, password } = values
        try {
          await registerUser(username, password)
          toast.success('User created', toastSuccessOptions)
          onNavigateToSignIn()
        } catch (error) {
          console.error(error)
        }
      }}
    >
      {() => (
        <Form className='p-8'>
          <h2 className='mb-2 text-4xl text-center font-bold'>Sign up</h2>
          <h3 className='mb-4 text-lg text-gray-500 text-center'>
            Create a free account
          </h3>
          <div className='space-y-4'>
            <InputField name='username' placeholder='Username' />
            <InputField
              name='password'
              type='password'
              placeholder='Password'
            />
            <button className='button primary w-full' type='submit'>
              Sign up
            </button>
          </div>
          <div className='mt-8 text-center'>
            Already have an account?{' '}
            <span
              className='cursor-pointer font-medium text-blue-600'
              onClick={onNavigateToSignIn}
            >
              Sign in
            </span>
          </div>
        </Form>
      )}
    </Formik>
  )
}
