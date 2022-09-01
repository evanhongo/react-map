import { useState, useEffect, useMemo } from "react";
import L, { heatLayer } from "leaflet";
import "leaflet.heat"
import { MapContainer, TileLayer,  ZoomControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaSatellite } from 'react-icons/fa';

import Control from '../Control.jsx'

const corner1 = L.latLng(25.525131906306587, 124.78685617446901);
const corner2 = L.latLng(21.634492026874533, 117.40404367446901);
const CENTER = [23, 122];
const MAX_BOUNDS = L.latLngBounds(corner1, corner2);

function HeatMapLayer({ points }) {
  const map = useMap();
  useEffect(() => {
    const HeatMapLayer = heatLayer(points, { minOpacity: 1 });
    map.addLayer(HeatMapLayer);

    return () => {  
      map.removeLayer(HeatMapLayer);
    }
  }, [])

  return null
}

export default function HeatMap({ width, height, points }) {
  const [map, setMap] = useState(null);
  const [isSatelliteMode, setIsSatelliteMode] = useState(false);
  
  const handleClickSatelliteBtn = useMemo(() => (e) =>{
    setIsSatelliteMode(v => !v);
  }, []);

  return (
    <div style={{ width, height }}>
      <MapContainer
        center={CENTER}
        zoom={7}
        zoomControl={false}
        scrollWheelZoom={false}
        drawControlTooltips={true}
        whenReady={setMap}
        maxBounds={MAX_BOUNDS}
        style={{ height: "100%" }}        
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"          
        />
        {isSatelliteMode && <TileLayer
          url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
          subdomains={['mt0','mt1','mt2','mt3']}           
        />
        }
        {map && <HeatMapLayer points={points} />}
        <ZoomControl  position="topright" />
        <Control position='topright'>
            <button onClick={handleClickSatelliteBtn} style={{width: "35px" , cursor: "pointer", backgroundColor: isSatelliteMode? "orange" : "white" }}><FaSatellite /></button>
        </Control>
      </MapContainer>
    </div>
  );
}