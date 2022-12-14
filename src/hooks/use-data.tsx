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
  const [venues, setVenues] = useState<Venue[]>([])

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    try {
      const res = await axios.get('/api/venues')
      setVenues(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DataContext.Provider value={{ venues }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext)
}
