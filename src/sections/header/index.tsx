import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'
import axios from 'axios'
import { X, MessageSquare, PlusCircle } from 'react-feather'

import { FeedbackForm } from '../../components/feedback-form'
import { useSearch } from '../../hooks/use-search'
import type { Venue } from '../../hooks/use-data'

export const formClassName = 'bg-white p-4 md:p-8 rounded shadow-xl w-full md:max-w-sm'
export const inputClassName = 'border border-gray-400 h-8 px-2 w-full mt-1 md:max-w-sm rounded-sm'
export const btnClassName = 'flex items-center justify-center gap-1.5 bg-orange-500 text-white h-8 px-3 rounded-sm font-medium hover:opacity-90 drop-shadow transition-colors w-full'
export const overlayClassName = 'absolute top-0 left-0 w-screen h-screen bg-gray-400/50 flex items-center justify-center'

export const Header: React.FC = () => {
  const searchRef = useRef<HTMLInputElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { setSearchText, searchResults, setActiveVenue } = useSearch()
  const { register, handleSubmit, formState, reset } = useForm()

  const search = useDebouncedCallback((e) => {
    setSearchText(e.target.value)
  }, 200)

  function onSubmit(data: Record<string, any>) {
    try {
      axios.post('/api/submit', data)
      setSuccess('Köszönjük!')
      reset()
      setTimeout(() => { setIsModalOpen(false) }, 900)
    } catch (err: any) {
      setError('Ez nem sikerült, kérlek, próbáld később.')
    }
  }

  return (
    <>
      <header className="h-40 mx-auto max-w-screen-xl p-4 md:p-8 flex flex-wrap gap-x-8">
        <h1 className="text-xl font-semibold text-gray-800 w-full shrink-0">
          Újratölthető pohár térkép
        </h1>
        <div className="w-full md:max-w-sm relative">
          <div>
            <div className="relative">
              <input
                type="text"
                aria-label="keresés"
                placeholder="keresés"
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
                aria-label="keresés törlése"
              >
                <X />
              </button>
            </div>
            {searchResults.length > 0 && (
              <ul className="absolute w-full text-gray-800" style={{ zIndex: 9999 }}>
                {searchResults.map((venue: Venue) => (
                  <li
                    key={`${venue.name}${venue.id}`}
                    className="h-8 px-2 bg-gray-100 hover:bg-gray-200 border-b border-gray-300 flex items-center cursor-pointer"
                    onClick={() => { setActiveVenue(venue) }}
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
              <PlusCircle size={18} /> <span>Új hely<span className="hidden md:inline">et jelentek</span></span>
            </button>
            <button
              className={btnClassName + ' mt-4 text-gray-700 bg-gray-200'}
              onClick={() => { setIsFeedbackModalOpen(true) }}
            >
              <MessageSquare size={18} /> Visszajelzés
            </button>
          </div>
        </div>
        <div className="flex text-xs gap-3 md:text-sm md:block mt-1.5 md:mt-0">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-emerald-600 relative top-px" />
            visszaadják a pénzt
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-600 relative top-px" />
            nem adják vissza<span className="hidden md:inline"> a pénzt</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-gray-600 relative top-px" />
            nem tudni
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
              Új hely jelentése
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <label>
                Hely neve<br />
                <input {...register('name')} className={inputClassName} placeholder="Pl. Bálna" />
              </label>
              <label>
                Hol van?<br />
                <input {...register('location')} className={inputClassName} placeholder="Pl. Szeged, Dob utca stb." />
              </label>
              <label>
                Rendszer<br />
                <input {...register('system')} className={inputClassName} placeholder="Pl. Cup Revolution" />
              </label>
              <label>
                Visszaadják a pénzt?<br />
                <input {...register('moneyBack')} className={inputClassName} placeholder="Pl. igen / nem / csak a Juci" />
              </label>
              <label>
                Egyéb infó<br />
                <input {...register('notes')} className={inputClassName} />
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
      )}
      {isFeedbackModalOpen && <FeedbackForm onClose={() => { setIsFeedbackModalOpen(false) }} />}
    </>
  )
}
