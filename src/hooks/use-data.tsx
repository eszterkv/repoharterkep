import { createContext, useContext, useEffect, useState } from 'react'
import type { LatLngTuple } from 'leaflet'

export type Venue = {
  id: string
  name: string
  coordinates: LatLngTuple
  system?: string
  price?: number
  moneyBack?: boolean
  notes?: string
}

const fakeVenues: Venue[] = [
  {
    id: '960',
    name: 'Budapest Park',
    coordinates: [47.4676345, 19.0745992],
    system: 'Park',
    price: 300,
    moneyBack: false,
    notes: 'teszt',
  },
  {
    id: '960',
    name: 'Budapest Park 1',
    coordinates: [47.4676345, 19.0745992],
    system: 'Park',
    price: 300,
    moneyBack: false,
    notes: 'teszt',
  },
  {
    id: '960',
    name: 'Budapest Park 2',
    coordinates: [47.4676345, 19.0745992],
    system: 'Park',
    price: 300,
    moneyBack: false,
    notes: 'teszt',
  },
  {
    id: '960',
    name: 'Bubo',
    coordinates: [47.4676345, 19.0745992],
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
