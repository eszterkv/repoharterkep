import { createContext, useContext, useEffect, useState } from 'react'

export type Venue = {
  id: string
  name: string
  lat: number
  lng: number
  system?: string
  price?: number
  moneyBack?: boolean
  notes?: string
}

const fakeVenues: Venue[] = [
  {
    id: '960',
    name: 'Budapest Park',
    lat: 47.4676345,
    lng: 19.0745992,
    system: 'Park',
    price: 300,
    moneyBack: false,
    notes: 'teszt',
  },
  {
    id: '960',
    name: 'Budapest Park 1',
    lat: 47.4676345,
    lng: 19.0745992,
    system: 'Park',
    price: 300,
    moneyBack: false,
    notes: 'teszt',
  },
]

const DataContext = createContext({} as any)

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [venues, setVenues] = useState<Venue[]>([])

  useEffect(() => {
    setVenues(fakeVenues)
  }, [])

  return (
    <DataContext.Provider value={{ venues }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext)
}
