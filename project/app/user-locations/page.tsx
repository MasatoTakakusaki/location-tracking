"use client";

import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100vw",
  height: "500px",
};

// Vancouver
const center = {
  lat: 49.246292,
  lng: -123.116226,
};

function MapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCotqIwoi5mmrVa_LSdht-h6DuNG0WKzQc",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [zoom, setZoom] = useState<number>(8);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (!map) {
      return;
    }
    const initialZoom = map.getZoom();
    if (initialZoom === undefined) {
      return;
    }
    setZoom(initialZoom);
  }, [map]);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onUnmount={onUnmount}
      ></GoogleMap>
    </>
  ) : (
    <>
      <h1>Loading...</h1>
    </>
  );
}
export default React.memo(MapComponent);
