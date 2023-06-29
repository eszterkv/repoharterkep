import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

import {
  formClassName,
  inputClassName,
  btnClassName,
  overlayClassName,
} from '../sections/header'

export const FeedbackForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { t } = useTranslation()
  const { register, handleSubmit, formState, reset } = useForm()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function onSubmit(data: Record<string, any>) {
    try {
      await axios.post('/api/feedback', data)
      setSuccess(t('submit_success'))
      reset()
      setTimeout(() => { onClose() }, 900)
    } catch (err: any) {
      setError(t('submit_error'))
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
          {t('feedback_form.title')}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <label>
            <span className="text-sm block mb-2">
              {t('feedback_form.text')}<br />
            </span>
            <textarea
              {...register('message')}
              className={inputClassName + ' pt-2 !h-32'}
              rows={4}
            >
            </textarea>
          </label>
          <button type="submit" disabled={formState.isSubmitting} className={btnClassName}>
            {t('submit')}
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
