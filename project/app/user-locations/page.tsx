"use client";

import React, { useState, useEffect, useContext } from "react";
import LocationMap from "../components/LocationMap";
import LocationList from "../components/LocationList";
import { LocationContext } from "../context/locationContext";
import { RegistrationContext } from "../context/registrationContext";

function Page() {
  const userLocation = useContext(LocationContext);
  const { isRegistered, setIsRegistered } = useContext(RegistrationContext);
  const [locations, setLocations] = useState<UserLocationType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getAllUserLocations();
        setLocations(data);
        setIsLoaded(true);
        setIsRegistered(false);
      } catch (error) {
        console.error("Failed to fetch user locations:", error);
      }
    };

    fetchLocations();
  }, [isRegistered, setIsRegistered]);

  const latLongs = locations.map((location) => ({
    lat: location.latitude,
    lng: location.longitude,
  }));

  return isLoaded ? (
    <>
      <div className="mb-2">
        <h1 className="italic font-bold text-4xl">
          Site Visitor Locations(For only Admin)
        </h1>
      </div>
      <LocationMap currentLocation={userLocation} locations={latLongs} />
      <div className="m-1"></div>
      <LocationList locations={locations} />
    </>
  ) : null;
}

// GET all user locations data
const getAllUserLocations = async () => {
  const fetchAPI = "/api/user-locations";
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
