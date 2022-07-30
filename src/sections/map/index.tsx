import React, { useState } from 'react'
import { Icon, LatLngTuple } from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import './leaflet.css'

type Venue = {
  id: string
  name: string
  description?: string
  coordinates: LatLngTuple
}

const venues: Venue[] = [
    {
      id: '960',
      name: "Bearbrook Skateboard Park",
      description: "Flat asphalt surface, 5 components",
      coordinates: [45.383321536272049, -75.3372987731628],
    },
    {
      id: '1219',
      name: "Bob MacQuarrie Skateboard Park (SK8 Extreme Park)",
      description: "Flat asphalt surface, 10 components, City run learn to skateboard programs, City run skateboard camps in summer",
      coordinates: [45.467134581917357, -75.546518086577947],
    }
]

export const Map: React.FC = () => {
  const [activeVenue, setActiveVenue] = useState<Venue | null>()

  return (
    <MapContainer center={[45.4, -75.7]} zoom={12} scrollWheelZoom={false}>
      {activeVenue && (
        <Popup
          position={activeVenue.coordinates}
          eventHandlers={{
            popupclose: () => { setActiveVenue(null) }
          }}
        >
          <div>
            <h2>{activeVenue.name}</h2>
            <p>{activeVenue.description}</p>
          </div>
        </Popup>
      )}
      {venues.map(venue => (
        <Marker
          key={venue.id}
          position={venue.coordinates}
          icon={new Icon({ iconUrl: "https://placekitten.com/20/20" })}
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
