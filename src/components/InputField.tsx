import { useField } from 'formik'

type OwnProps = {
  showError?: boolean
}

type Props = OwnProps & React.InputHTMLAttributes<HTMLInputElement>

export const InputField: React.FC<Props> = ({ showError = true, ...props }) => {
  const [field, meta] = useField(props.name!)
  const styleInputError = showError && meta.touched && meta.error ? 'error' : ''
  return (
    <div>
      <input className={`input ${styleInputError}`} {...props} {...field} />
      {showError && meta.touched && meta.error && (
        <div className='mt-1 text-sm text-pink-600'>{meta.error}</div>
      )}
    </div>
  )
}
