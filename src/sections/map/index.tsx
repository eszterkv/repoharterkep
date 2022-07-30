import React, { useState } from 'react'
import { Icon, LatLngTuple } from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import './leaflet.css'

type Venue = {
  id: string
  name: string
  coordinates: LatLngTuple
  system?: string
  price?: number
  notes?: string
}

const venues: Venue[] = [
  {
    id: '960',
    name: 'Budapest Park',
    coordinates: [47.4676345, 19.0745992],
    system: 'Park',
    price: 300,
    notes: 'teszt',
  },
]

const budapestCoords: LatLngTuple = [47.497913, 19.040236]

export const Map: React.FC = () => {
  const [activeVenue, setActiveVenue] = useState<Venue | null>()

  return (
    <MapContainer center={budapestCoords} zoom={13} scrollWheelZoom={true}>
      {activeVenue && (
        <Popup
          position={activeVenue.coordinates}
          eventHandlers={{
            popupclose: () => { setActiveVenue(null) }
          }}
        >
          <div>
            <h2>{activeVenue.name}</h2>
            <dl>
              <div>
                <dt>Rendszer:</dt>
                <dd>{activeVenue.system}</dd>
              </div>
              <div>
                <dt>Ár:</dt>
                <dd>{activeVenue.price}</dd>
              </div>
            </dl>
            <p>{activeVenue.notes}</p>
          </div>
        </Popup>
      )}
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
