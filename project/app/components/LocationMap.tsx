import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import dotenv from "dotenv";

dotenv.config();

// Import LatLngLiteral type from @react-google-maps/api
type LatLngLiteral = google.maps.LatLngLiteral;

const containerStyle = {
  width: "100vw",
  height: "500px",
};

const defaultCenter: LatLngLiteral = {
  lat: 49.246292,
  lng: -123.116226,
};

function LocationMap({
  currentLocation,
  locations,
}: {
  currentLocation: LatLngLiteral | null;
  locations: LatLngLiteral[];
}) {
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [zoom, setZoom] = useState<number>(5);

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
        center={currentLocation || defaultCenter}
        zoom={zoom}
        onUnmount={onUnmount}
      >
        {locations.map((location, index) => (
          <Marker key={index} position={location} />
        ))}
      </GoogleMap>
    </>
  ) : null;
}

export default React.memo(LocationMap);
