import React, { useEffect, useState } from 'react'
import {Marker,Popup,useMap} from "react-leaflet"
import L from  "leaflet"
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon=DefaultIcon
const GeoCoderMarker = ({ address }) => {
  const map = useMap();
  const [position, setPosition] = useState([60, 19]);

  useEffect(() => {
    const fulladdress=address?.trim();
    if (fulladdress) {
      const geocoder = L.Control.Geocoder.nominatim();
      geocoder.geocode(fulladdress, (results) => {
        if (results.length > 0) {
          const { center } = results[0];
          setPosition([center.lat, center.lng]);
          map.flyTo([center.lat, center.lng], 10);
        } else {
          console.log("No results found for address:", fulladdress);
        }
      });
    }
  }, [address, map]);
  return position ? (
    <Marker position={position} icon={DefaultIcon}>
      <Popup>{address}</Popup>
    </Marker>
  ) : null;
};

export default GeoCoderMarker