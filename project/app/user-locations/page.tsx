"use client";

import React, { useContext } from "react";
import LocationMap from "../components/LocationMap";
import LocationList from "../components/LocationList";
import { LocationContext } from "../locationContext";

function Page() {
  // Access userLocation from LocationContext
  const userLocation = useContext(LocationContext);

  return (
    <>
      <LocationMap userLocation={userLocation} />
      <LocationList />
    </>
  );
}

export default Page;
