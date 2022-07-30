import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'

import './leaflet.css'
import * as mapdata from '../../data.json'

export const Map: React.FC = () => {
  return (
    <MapContainer center={[45.4, -75.7]} zoom={12}scrollWheelZoom={false}>
      <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&copy <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
      />
    </MapContainer>
  )
}
