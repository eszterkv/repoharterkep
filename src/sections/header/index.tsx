import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'
import axios from 'axios'

import { useSearch } from '../../hooks/use-search'
import type { Venue } from '../../hooks/use-data'

const inputClassName = 'border border-gray-400 h-8 px-2 w-full mt-1 md:max-w-sm rounded-sm'
const btnClassName = 'bg-orange-500 hover:bg-orange-400 text-white h-8 px-4 rounded-sm'

export const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { setSearchText, searchResults } = useSearch()
  const { register, handleSubmit, formState } = useForm()

  const search = useDebouncedCallback((e) => {
    setSearchText(e.target.value)
  }, 200)

  function onSubmit(data: Record<string, any>) {
    axios.post('/api/submit', data)
  }

  return (
    <>
      <header className="h-40 mx-auto max-w-screen-xl p-4 md:p-8">
        <h1 className="text-xl font-semibold text-gray-800">
          Repohár térkép
        </h1>
        <div className="w-full md:max-w-sm relative">
          <input
            type="text"
            aria-label="keresés"
            placeholder="keresés"
            className={inputClassName}
            onChange={search}
          />
          {searchResults.length > 0 && (
            <ul className="absolute w-full text-gray-800" style={{ zIndex: 9999 }}>
              {searchResults.map(({ id, name }: Venue) => (
                <li
                  key={`${name}${id}`}
                  className="h-8 px-2 bg-gray-100 hover:bg-gray-200 border-b border-gray-300 flex items-center cursor-pointer"
                  onClick={() => { /* todo open point */}}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          className={btnClassName}
          onClick={() => { setIsModalOpen(true) }}
        >
          Új helyet jelentek
        </button>
      </header>
      {isModalOpen && (
        <div
          className="absolute top-0 left-0 w-screen h-screen bg-gray-400/50 flex items-center justify-center"
          style={{ zIndex: 9999 }}
          onClick={() => {/* setIsModalOpen(false)*/ }}
        >
          <div className="bg-white p-4 md:p-8 rounded shadow-xl w-full md:max-w-sm">
            <h2 className="text-lg font-semibold mb-4">
              Új hely jelentése
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <label>
                Hely neve<br />
                <input {...register('name')} className={inputClassName} />
              </label>
              <label>
                Rendszer (pl. Cup Revolution)<br />
                <input {...register('system')} className={inputClassName} />
              </label>
              <label>
                Visszaadják a pénzt?<br />
                <input {...register('notes')} className={inputClassName} />
              </label>
              <label>
                Egyéb infó<br />
                <input {...register('notes')} className={inputClassName} />
              </label>
              <button type="submit" disabled={formState.isSubmitting} className={btnClassName}>
                Mehet!
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
