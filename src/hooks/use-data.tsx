import { createContext, useContext, useEffect, useState } from 'react'
import Airtable from 'airtable'

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

const DataContext = createContext({} as any)

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE)

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [venues, setVenues] = useState<Venue[]>([])

  useEffect(fetchData, [])

  function fetchData() {
    const results: Venue[] = []

    base('repohar').select().eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
        results.push(record.fields as Venue)
      });
      fetchNextPage()
    }, function done(err) {
      if (err) { console.error(err); return }

      setVenues(results)
    })
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
