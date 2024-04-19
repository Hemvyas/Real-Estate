import React from 'react'
import {MapContainer,TileLayer} from "react-leaflet"
import GeoCoderMarker from '../GeoCoderMarker/GeoCoderMarker'

const Map = ({city,country}) => {
  return (
    <>
      <MapContainer
        center={[53.35, 18.8]}
        zoom={1}
        scrollWheelZoom={false}
        style={{ height: "40vh", width: "100%", marginTop: "20px", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoCoderMarker address={` ${city} ${country}`} />
      </MapContainer>
    </>
  );
}

export default Map