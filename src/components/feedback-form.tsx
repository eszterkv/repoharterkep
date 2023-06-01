import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import {
  formClassName,
  inputClassName,
  btnClassName,
  overlayClassName,
} from '../sections/header'

export const FeedbackForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { register, handleSubmit, formState, reset } = useForm()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function onSubmit(data: Record<string, any>) {
    try {
      await axios.post('/api/feedback', data)
      setSuccess('Köszönjük!')
      reset()
      setTimeout(() => { onClose() }, 900)
    } catch (err: any) {
      setError('Ez nem sikerült, kérlek, próbáld később.')
    }
  }

  return (
    <div
      className={overlayClassName}
      style={{ zIndex: 9999 }}
      id="overlay"
      onClick={(e: any) => {
        if (e.target.id === 'overlay') onClose()
      }}
    >
      <div id="form" className={formClassName}>
        <h2 className="text-lg font-semibold mb-4">
          Visszajelzés
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <label>
            <span className="text-sm block mb-2">
              Hibát találtál? Ötleted van? Vagy csak tetszik? Ide jöhet!<br />
            </span>
            <textarea
              {...register('message')}
              className={inputClassName + ' pt-2 !h-32'}
              rows={4}
            >
            </textarea>
          </label>
          <button type="submit" disabled={formState.isSubmitting} className={btnClassName}>
            Mehet!
          </button>
        </form>
        <div className="h-5 relative mt-3">
          {error && (
            <p className="absolute text-red-600 text-sm">
              {error}
            </p>
          )}
          {success && (
            <p className="absolute text-green-700 text-sm">
              {success}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
