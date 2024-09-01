import React, { createContext, useState, useEffect } from "react";

type LocationType = {
  lat: number;
  lng: number;
};

// Vancouver as default
const defaultLocation: LocationType = {
  lat: 49.246292,
  lng: -123.116226,
};

const LocationContext = createContext<LocationType>(defaultLocation);

const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userLocation, setUserLocation] =
    useState<LocationType>(defaultLocation);

  useEffect(() => {
    const fetchLocation = () => {
      if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        return;
      }

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
    };

    fetchLocation();
  }, []);

  return (
    <LocationContext.Provider value={userLocation}>
      {children}
    </LocationContext.Provider>
  );
};

export { LocationContext, LocationProvider };
