import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import type { LatLngTuple } from 'leaflet'

import { useData, Venue } from '../../hooks/use-data'
import './leaflet.css'

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
  const { venues } = useData()
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
      {venues.map((venue: Venue) => (
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
