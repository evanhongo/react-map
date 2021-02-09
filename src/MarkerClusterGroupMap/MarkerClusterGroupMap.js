import React from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import "../../css/MarkerClusterGroupMap.scss";

const createClusterCustomIcon = (cluster) => {
  const count = cluster
    .getAllChildMarkers()
    .reduce((acc, cur) => acc + cur.options.count, 0);

  const level = count < 1000 ? "small" : count < 10000 ? "medium" : "large";
  const iconSize = count < 1000 ? 40 : count < 10000 ? 80 : 100;

  return L.divIcon({
    html: `<span>${count}</span>`,
    className: `marker-cluster-${level}`,
    iconSize: L.point(iconSize, iconSize, true),
  });
};

const createMarkerCustomIcon = (count) => {
  const level = count < 1000 ? "small" : count < 10000 ? "medium" : "large";
  const iconSize = count < 1000 ? 40 : count < 10000 ? 80 : 100;

  return L.divIcon({
    html: `<span>${count}</span>`,
    className: `marker-cluster-${level}`,
    iconSize: L.point(iconSize, iconSize, true),
  });
};

const center = [23, 122];

export default function MarkerClusterGroupMap({ width, height, markers = [] }) {
  return (
    <div
      style={{
        width,
        height,
        border: "2px rgb(241, 241, 243) solid",
        borderRadius: "1%",
      }}
    >
      <MapContainer center={center} zoom={7} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
          iconCreateFunction={createClusterCustomIcon}
          removeOutsideVisibleBounds={true}
          maxClusterRadius={80}
        >
          {markers.map((marker, i) => (
            <Marker
              key={i}
              position={[marker.lat, marker.lng]}
              icon={createMarkerCustomIcon(marker.count)}
              count={marker.count}
            />
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
