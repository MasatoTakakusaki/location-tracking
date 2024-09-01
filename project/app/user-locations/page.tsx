"use client";

import React, { useState, useEffect, useContext } from "react";
import LocationMap from "../components/LocationMap";
import LocationList from "../components/LocationList";
import { LocationContext } from "../context/locationContext";
import { RegistrationContext } from "../context/registrationContext";

function Page() {
  const userLocation = useContext(LocationContext);
  const { isRegistered } = useContext(RegistrationContext);

  const [locations, setLocations] = useState<UserLocationType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getAllUserLocations();
        setLocations(data);
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to fetch user locations:", error);
      }
    };

    fetchLocations();
  }, [isRegistered]); // isRegisteredがtrueになった時にfetchLocationsを再実行

  const latLongs = locations.map((location) => ({
    lat: location.latitude,
    lng: location.longitude,
  }));

  return isLoaded ? (
    <>
      <LocationMap currentLocation={userLocation} locations={latLongs} />
      <LocationList locations={locations} />
    </>
  ) : null;
}

// GET all user locations data
const getAllUserLocations = async () => {
  const fetchAPI = "http://localhost:3000/api/user-locations";
  try {
    const response = await fetch(fetchAPI);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch user locations:", error);
    throw error;
  }
};

export default Page;
