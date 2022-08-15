import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'

import { useData, Venue } from '../../hooks/use-data'
import { useSearch } from '../../hooks/use-search'
import './leaflet.css'

const budapestCoords: [number, number] = [47.497913, 19.040236]

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
  const { activeVenue, setActiveVenue } = useSearch()

  const ActiveVenuePopup: React.FC<Venue> = ({
    name,
    lat,
    lng,
    system,
    // price,
    moneyBack,
    notes,
  }) => {
    return (
      <Popup
        position={[lat, lng]}
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
            <VenueProp label="Visszaadják a pénzt?" value={toMoneyBackString(moneyBack)} />
          </dl>
          {notes && <p><strong>Egyéb:</strong> {notes}</p>}
        </div>
      </Popup>
    )
  }

  return (
    <MapContainer center={budapestCoords} zoom={12} scrollWheelZoom={true}>
      {activeVenue && <ActiveVenuePopup {...activeVenue} />}
      {venues.map((venue: Venue) => (
        <Marker
          key={venue.id}
          position={[venue.lat, venue.lng]}
          icon={new Icon({ iconUrl: '/assets/location-marker.svg', iconSize: [28, 28] })}
          eventHandlers={{
            click: () => { setActiveVenue(venue) }
          }}
        />
      ))}
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/ekov/${process.env.REACT_APP_TILESET_ID}/tiles/{z}/{x}/{y}/?access_token=${process.env.REACT_APP_MAPBOX_PK}`}
        attribution="&copy <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
      />
    </MapContainer>
  )
}
