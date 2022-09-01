import React, { useState, useEffect } from "react";
import {
  Control,
  FeatureGroup,
  Circle,
  Polygon,
  DomUtil,
  DomEvent,
} from "leaflet";
import "leaflet-draw";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet-draw/dist/leaflet.draw.css";

import MapSearch from "./MapSearch";

const CENTER = [23, 122];
const POLYGON_COLOR = "#333";

function DrawLayer({ setLocation }) {
  const map = useMap();

  useEffect(() => {
    const featureGroup = new FeatureGroup();
    map.addLayer(featureGroup);

    const drawControl = new Control.Draw({
      draw: {
        polyline: false,
        marker: false,
        circle: true,
        polygon: {
          allowIntersection: false,
          shapeOptions: {
            color: POLYGON_COLOR,
          },
        },
        rectangle: {
          shapeOptions: {
            color: POLYGON_COLOR,
          },
        },
        circlemarker: false,
      },
    });
    map.addControl(drawControl);

    const ClearControl = Control.extend({
      options: {
        position: "topleft",
      },
      onAdd: () => {
        const controlDiv = DomUtil.create(
          "div",
          "leaflet-draw-toolbar leaflet-bar"
        );
        const controlUI = DomUtil.create(
          "a",
          "leaflet-draw-edit-remove",
          controlDiv
        );
        controlUI.title = "Remove all drawn items";
        controlUI.setAttribute("href", "#");

        DomEvent.addListener(controlUI, "click", DomEvent.stopPropagation)
          .addListener(controlUI, "click", DomEvent.preventDefault)
          .addListener(controlUI, "click", () => {
            setLocation((location) => ({
              ...location,
              type: "polygon",
              polygon: [],
              circle: { radius: 0, lat: 0, lng: 0 },
            }));
            featureGroup.clearLayers();
          });
        return controlDiv;
      },
    });
    const clearControl = new ClearControl();
    map.addControl(clearControl);

    const drawPolygon = (layer) => {
      if (layer.getLatLngs().length) {
        const polygon = layer.getLatLngs()[0];
        setLocation((location) => ({
          ...location,
          type: "polygon",
          polygon,
        }));

        const polygonInstance = new Polygon(polygon, { color: "#3B5B87" });
        featureGroup.addLayer(polygonInstance);
        const bounds = polygonInstance.getBounds();
        map.fitBounds(bounds);
      }
    };

    const drawCircle = (layer) => {
      const circle = {
        radius: layer.getRadius(),
        lat: layer.getLatLng().lat,
        lng: layer.getLatLng().lng,
      };

      setLocation((location) => ({
        ...location,
        type: "circle",
        circle,
      }));

      const circleInstance = new Circle([circle.lat, circle.lng], {
        radius: circle.radius,
        color: "#3B5B87",
      });

      featureGroup.addLayer(circleInstance);
      const bounds = circleInstance.getBounds();
      map.fitBounds(bounds);
    };

    const draw = {
      polygon: (layer) => drawPolygon(layer),
      rectangle: (layer) => drawPolygon(layer),
      circle: (layer) => drawCircle(layer),
    };

    map.on("draw:created", (e) => {
      const { layerType, layer } = e;
      featureGroup.clearLayers();
      draw[layerType](layer);
    });
  }, [map, setLocation]);

  return null;
}

export default function DrawMap({ width, height }) {
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState({
    name: "",
    type: "polygon",
    polygon: [],
    circle: { radius: 0, lat: 0, lng: 0 },
  });

  return (
    <div style={{ width, height }}>
      {map && <MapSearch map={map} style={{ width }} />}
      <MapContainer
        center={CENTER}
        zoom={7}
        scrollWheelZoom={false}
        drawControlTooltips={true}
        whenReady={setMap}
        style={{ height: "100%", marginTop: "10px" }}
      >
        <TileLayer          
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DrawLayer setLocation={setLocation} />
      </MapContainer>
    </div>
  );
}
