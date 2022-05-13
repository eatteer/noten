import { useField } from 'formik'

export const InputField = (
  props: React.InputHTMLAttributes<HTMLInputElement>
) => {
  const [field, meta] = useField(props.name!)
  const styleInputError = meta.touched && meta.error ? 'error' : ''
  return (
    <div>
      <input className={`input ${styleInputError}`} {...props} {...field} />
      {meta.touched && meta.error && (
        <div className='mt-1 text-sm text-pink-600'>{meta.error}</div>
      )}
    </div>
  )
}
