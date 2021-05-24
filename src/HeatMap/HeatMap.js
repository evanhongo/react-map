import React, { useState, useEffect } from "react";
import { heatLayer } from "leaflet";
import "leaflet.heat"
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import addressPoints from "./points";

const CENTER = [23, 122];

function HeatMapLayer({ points }) {
  const map = useMap();
  useEffect(() => {
    const HeatMapLayer = heatLayer(points);
    map.addLayer(HeatMapLayer);
  }, [])

  return null
}

export default function HeatMap({ width, height }) {
  const [map, setMap] = useState(null);

  return (
    <div style={{ width, height }}>
      <MapContainer
        center={CENTER}
        zoom={7}
        scrollWheelZoom={false}
        drawControlTooltips={true}
        whenCreated={setMap}
        style={{ marginTop: "10px" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {map && <HeatMapLayer points={addressPoints} />}
      </MapContainer>
    </div>
  );
}