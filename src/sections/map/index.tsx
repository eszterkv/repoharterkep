import React, { useState } from 'react'
import { LatLngTuple } from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import './leaflet.css'

type Venue = {
  id: string
  name: string
  coordinates: LatLngTuple
  system?: string
  price?: number
  moneyBack?: boolean
  notes?: string
}

const venues: Venue[] = [
  {
    id: '960',
    name: 'Budapest Park',
    coordinates: [47.4676345, 19.0745992],
    system: 'Park',
    price: 300,
    moneyBack: false,
    notes: 'teszt',
  },
]

const budapestCoords: LatLngTuple = [47.497913, 19.040236]

const VenueProp: React.FC<{ label: string, value: string }> = ({ label, value = '' }) => (
  <div className="flex gap-4 my-1.5">
    <dt className="w-1/2">{label}</dt>
    <dd>{value}</dd>
  </div>
)

function toMoneyBackString(moneyBack?: boolean) {
  if (moneyBack === null || moneyBack === undefined)
    return 'nem tudni'

  return moneyBack ? 'igen' : 'nem'
}

export const Map: React.FC = () => {
  const [activeVenue, setActiveVenue] = useState<Venue | null>()

  const ActiveVenuePopup: React.FC<Venue> = ({
    name,
    coordinates,
    system,
    price,
    moneyBack,
    notes,
  }) => {
    return (
      <Popup
        position={coordinates}
        eventHandlers={{
          popupclose: () => { setActiveVenue(null) }
        }}
        minWidth={250}
        maxWidth={300}
      >
        <div>
          <h2 className="text-lg font-medium mb-3">{name}</h2>
          <dl>
            <VenueProp label="Rendszer" value={system || 'nem ismert'} />
            <VenueProp label="Díj" value={`${price} Ft`} />
            <VenueProp label="Visszaadják a pénzt?" value={toMoneyBackString(moneyBack)} />
          </dl>
          {notes && <p><strong>Egyéb:</strong> {notes}</p>}
        </div>
      </Popup>
    )
  }

  return (
    <MapContainer center={budapestCoords} zoom={13} scrollWheelZoom={true}>
      {activeVenue && <ActiveVenuePopup {...activeVenue} />}
      {venues.map(venue => (
        <Marker
          key={venue.id}
          position={venue.coordinates}
          eventHandlers={{
            click: () => { setActiveVenue(venue) }
          }}
        />
      ))}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
      />
    </MapContainer>
  )
}
