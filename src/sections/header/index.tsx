import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { useSearch } from '../../hooks/use-search'

import type { Venue } from '../../hooks/use-data'

export const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { setSearchText, searchResults } = useSearch()

  const search = useDebouncedCallback((e) => {
    setSearchText(e.target.value)
  }, 200)

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
            className="border border-gray-400 py-1 px-2 mt-4 w-full md:max-w-sm"
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
        {/*
        <button
          className="bg-orange-400 text-white"
          onClick={() => { setIsModalOpen(true) }}
        >
          Új helyet jelentek
        </button>
          */}
      </header>
      {isModalOpen && (
        <div
          className="absolute top-0 left-0 w-screen h-screen bg-gray-400/50 flex items-center justify-center"
          style={{ zIndex: 9999 }}
          onClick={() => { setIsModalOpen(false) }}
        >
          <div className="bg-white p-4 md:p-8 rounded shadow-xl">
            <h2 className="text-lg font-semibold">
              Új hely jelentése
            </h2>
          </div>
        </div>
      )}
    </>
  )
}
