import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'
import { useTranslation } from 'react-i18next'
import { X, MessageSquare, PlusCircle } from 'react-feather'
import axios from 'axios'

import { FeedbackForm } from '../../components/feedback-form'
import { useData } from '../../hooks/use-data'
import { useSearch } from '../../hooks/use-search'
import type { Venue } from '../../hooks/use-data'

export const formClassName = 'bg-white p-4 md:p-8 rounded shadow-xl w-full md:max-w-sm'
export const inputClassName = 'border border-gray-400 h-8 px-2 w-full mt-1 md:max-w-sm rounded-sm'
export const btnClassName = 'flex items-center justify-center gap-1.5 bg-orange-500 text-white h-8 px-3 rounded-sm font-medium hover:opacity-90 drop-shadow transition-colors w-full'
export const overlayClassName = 'absolute top-0 left-0 w-screen h-screen bg-gray-400/50 flex items-center justify-center'

const filterOptions = [
  'moneyback',
  'type_cuprevolution',
  'type_hanaplast',
  'type_other',
]

export const Header: React.FC = () => {
  const searchRef = useRef<HTMLInputElement>(null)
  const { t, i18n } = useTranslation()
  const { filters, setFilters } = useData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)

  const { setSearchText, searchResults, setActiveVenue } = useSearch()
  const { register, handleSubmit, formState, reset } = useForm()

  const search = useDebouncedCallback((e) => {
    setSearchText(e.target.value)
    if (!searchOpen) setSearchOpen(true)
  }, 200)

  function onSubmit(data: Record<string, any>) {
    try {
      axios.post('/api/submit', data)
      setSuccess(t('submit_success'))
      reset()
      setTimeout(() => { setIsModalOpen(false) }, 900)
    } catch (err: any) {
      setError(t('submit_error'))
    }
  }

  return (
    <>
      <header className="relative h-50 mx-auto max-w-screen-xl p-4 md:p-8 flex flex-wrap gap-x-8">
        <button
          onClick={() => {i18n.changeLanguage(i18n.language === 'hu' ? 'en' : 'hu')}}
          className="absolute top-3 right-3 text-sm text-blue-600 font-semibold hover:text-blue-800"
        >
          {i18n.language === 'hu' ? 'English' : 'magyar'}
        </button>
        <h1 className="text-xl font-semibold text-gray-800 w-full shrink-0">
          {t('title')}
        </h1>
        <div className="w-full md:max-w-sm relative">
          <div>
            <div className="relative">
              <input
                type="text"
                aria-label={t('search')}
                placeholder={t('search')}
                className={inputClassName}
                onChange={search}
                ref={searchRef}
              />
              <button
                onClick={() => {
                  if (searchRef?.current) {
                    searchRef.current.value = ''
                    setSearchText('')
                  }
                }}
                className="absolute top-2 right-1 text-gray-400 hover:text-gray-600"
                aria-label={t('clear_search')}
              >
                <X />
              </button>
            </div>
            {searchOpen && searchResults.length > 0 && (
              <ul className="absolute w-full text-gray-800" style={{ zIndex: 9999 }}>
                {searchResults.map((venue: Venue) => (
                  <li
                    key={`${venue.name}${venue.id}`}
                    className="h-8 px-2 bg-gray-100 hover:bg-gray-200 border-b border-gray-300 flex items-center cursor-pointer"
                    onClick={() => {
                      if (searchRef.current) searchRef.current.value = venue.name
                      setSearchText(venue.name)
                      setSearchOpen(false)
                      setActiveVenue(venue)
                    }}
                  >
                    {venue.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex gap-4 max-w-sm">
            <button
              className={btnClassName + ' mt-4'}
              onClick={() => { setIsModalOpen(true) }}
            >
              <PlusCircle size={18} /> <span>{t('add_new_pt1')}<span className="hidden md:inline">{t('add_new_pt2')}</span></span>
            </button>
            <button
              className={btnClassName + ' mt-4 text-gray-700 bg-gray-200'}
              onClick={() => { setIsFeedbackModalOpen(true) }}
            >
              <MessageSquare size={18} /> {t('feedback')}
            </button>
          </div>
        </div>
        <div className="text-xs gap-3 md:text-sm mt-1.5 md:mt-0">
          <strong className="font-semibold">{t('filter.title')}</strong><br />
          {filterOptions.map(option => (
            <label key={option} className="flex gap-1">
              <input
                type="checkbox"
                checked={filters[option]}
                onChange={() => { setFilters({ ...filters, [option]: !filters[option] }) }}
              /> {t(`filter.${option}`)}
            </label>
          ))}
        </div>
        <div className="flex text-xs gap-3 md:text-sm md:block mt-1.5 md:mt-0 text-gray-600">
          <strong>{t('legend')}</strong><br />

          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-emerald-600 relative top-px" />
            {t('money_back_yes')}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-600 relative top-px" />
            {t('money_back_no')}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-gray-600 relative top-px" />
            {t('money_back_not_known')}
          </div>
        </div>
      </header>
      {isModalOpen && (
        <div
          className={overlayClassName}
          style={{ zIndex: 9999 }}
          id="overlay"
          onClick={(e: any) => {
            if (e.target.id === 'overlay') setIsModalOpen(false)
          }}
        >
          <div id="form" className={formClassName}>
            <h2 className="text-lg font-semibold mb-4">
              {t('add_new_form.title')}
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <label>
                {t('add_new_form.name')}<br />
                <input {...register('name')} className={inputClassName} placeholder={t('add_new_form.name_placeholder')} />
              </label>
              <label>
                {t('add_new_form.location')}<br />
                <input {...register('location')} className={inputClassName} placeholder={t('add_new_form.location_placeholder')} />
              </label>
              <label>
                {t('add_new_form.system')}<br />
                <input {...register('system')} className={inputClassName} placeholder={t('add_new_form.system_placeholder')} />
              </label>
              <label>
                {t('add_new_form.money_back')}<br />
                <input {...register('moneyBack')} className={inputClassName} placeholder={t('add_new_form.money_back_placeholder')} />
              </label>
              <label>
                {t('add_new_form.other_info')}<br />
                <input {...register('notes')} className={inputClassName} />
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
      )}
      {isFeedbackModalOpen && <FeedbackForm onClose={() => { setIsFeedbackModalOpen(false) }} />}
    </>
  )
}
