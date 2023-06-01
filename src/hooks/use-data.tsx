import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

export type Venue = {
  id: string
  name: string
  lat: number
  lng: number
  system?: string
  price?: number
  moneyBack?: string
  notes?: string
}

const DataContext = createContext({} as any)

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const DEFAULT_FILTERS = {
    moneyback: false,
    type_cuprevolution: true,
    type_hanaplast: true,
    type_other: true,
  }

  const [venues, setVenues] = useState<Venue[]>([])
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([])
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    try {
      const res = await axios.get('/api/venues')
      setVenues(res.data)
      setFilteredVenues(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const filtered = venues
      .filter(venue => filters.moneyback ? venue.moneyBack?.startsWith('igen') : true)
      .filter(venue => {
        if (!filters.type_cuprevolution && venue.system === 'Cup Revolution') return false
        if (!filters.type_hanaplast && venue.system === 'Hanaplast') return false
        if (!filters.type_other && !['Hanaplast', 'Cup Revolution'].includes(venue.system as any)) return false

        return true
      })


    setFilteredVenues(filtered)
  }, [venues, filters, setFilteredVenues])

  return (
    <DataContext.Provider value={{ venues: filteredVenues, filters, setFilters }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext)
}
