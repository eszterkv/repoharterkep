import React from 'react'
import { useTranslation } from 'react-i18next'
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

function getLocationMarkerVariant(moneyBack: string = '') {
  if (moneyBack.startsWith('igen')) return '-green'
  if (moneyBack.startsWith('nem')) return '-red'

  return ''
}

export const Map: React.FC = () => {
  const { venues } = useData()
  const { activeVenue, setActiveVenue } = useSearch()
  const { t } = useTranslation()

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
          remove: () => { setActiveVenue(null) },
        }}
        minWidth={250}
        maxWidth={300}
      >
        <div>
          <h2 className="text-lg font-medium mb-3">{name}</h2>
          <dl>
            <VenueProp label={t('popup.system')} value={system || 'nem ismert'} />
            <VenueProp label={t('popup.money_back')} value={moneyBack || t('popup.not_known')} />
          </dl>
          {notes && <p><strong>{t('add_new_form.other_info')}</strong> {notes}</p>}
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
          icon={new Icon({
            iconUrl: `/assets/location-marker${getLocationMarkerVariant(venue.moneyBack)}.svg`,
            iconSize: [28, 28],
          })}
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
