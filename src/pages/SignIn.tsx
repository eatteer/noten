import { Form, Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { InputField } from '../components/InputField'
import { toastErrorOptions } from '../components/toast/options'
import { loginUser } from '../redux/user/action-creators'
import { auth } from '../services/users-services'

export const SignIn = () => {
  console.log('Rendering SignIn')
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const navigateToSignUp = () => {
    navigate('/signup')
  }

  const navigateToHome = () => {
    navigate('/')
  }

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validate={({ username, password }) => {
        const errors: any = {}
        if (!username) {
          errors.username = 'Required'
        }
        if (!password) {
          errors.password = 'Required'
        }
        return errors
      }}
      onSubmit={async (values) => {
        const { username, password } = values
        try {
          const user = await auth(username, password)
          dispatch(loginUser(user))
          navigateToHome()
        } catch (error: any) {
          console.error(error.cause)
          toast.error(error.message, toastErrorOptions)
        }
      }}
    >
      {() => (
        <Form className='p-8'>
          <h2 className='mb-2 text-4xl text-center font-bold'>Sign in</h2>
          <h3 className='mb-4 text-lg text-center text-gray-500 '>
            Sign in with your username here
          </h3>
          <div className='space-y-4'>
            <InputField name='username' placeholder='Username' />
            <InputField
              name='password'
              type='password'
              placeholder='Password'
            />
            <button className='button primary w-full' type='submit'>
              Sign in
            </button>
          </div>
          <div className='mt-8 text-center'>
            Don't have an account?{' '}
            <span
              className='cursor-pointer font-medium text-blue-600'
              onClick={navigateToSignUp}
            >
              Sign up
            </span>
          </div>
        </Form>
      )}
    </Formik>
  )
}
