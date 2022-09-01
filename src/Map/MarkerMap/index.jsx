import React from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import "./index.css";

const createCustomMarkerIcon = (count) => {
  const level = count < 1000 ? "small" : count < 10000 ? "medium" : "large";
  const iconSize = count < 1000 ? 40 : count < 10000 ? 80 : 100;

  return L.divIcon({
    html: `<span>${count}</span>`,
    className: `marker-cluster-${level}`,
    iconSize: L.point(iconSize, iconSize, true),
  });
};

const center = [23, 122];

export default function MarkerMap({ width, height, markers = [] }) {
  return (
    <div
      style={{
        width,
        height,
        border: "2px rgb(241, 241, 243) solid",
        borderRadius: "1%",
      }}
    >
      <MapContainer center={center} zoom={7} scrollWheelZoom={false} style={{height: "100%" }}>
        <TileLayer          
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"          
        />
          {markers.map((marker, i) => (
            <Marker
              key={i}
              position={[marker.lat, marker.lng]}
              icon={createCustomMarkerIcon(marker.count)}
              count={marker.count}
            />
          ))}
      </MapContainer>
    </div>
  );
}
