import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import Fuse from 'fuse.js'

import { useData, Venue } from './use-data'

const SearchContext = createContext({} as any)

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { venues } = useData()
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState<Venue[]>([])

  const fuse = useMemo(() =>
    new Fuse(venues, { keys: ['name'], threshold: 0.3 }),
    [venues]
  )

  useEffect(() => {
    const results = fuse.search(searchText).map(({ item }) => item)
    setSearchResults(results as Venue[])
  }, [fuse, searchText])

  return (
    <SearchContext.Provider value={{ setSearchText, searchResults}}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  return useContext(SearchContext)
}
