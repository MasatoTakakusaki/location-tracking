"use client";

import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import dotenv from "dotenv";
import { Chatbot } from "../components/Chatbot";

dotenv.config();

const containerStyle = {
  width: "100vw",
  height: "500px",
};

// Vancouver
const defaultCenter = {
  lat: 49.246292,
  lng: -123.116226,
};

function MapComponent() {
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [zoom, setZoom] = useState<number>(8);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || defaultCenter}
        zoom={zoom}
        onUnmount={onUnmount}
      ></GoogleMap>
      <Chatbot userLocation={userLocation}></Chatbot>
    </>
  ) : (
    <>
      <h1>Loading...</h1>
    </>
  );
}
export default React.memo(MapComponent);
