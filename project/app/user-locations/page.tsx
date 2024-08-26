"use client";

import React, { useContext } from "react";
import LocationMap from "../components/LocationMap";
import { LocationContext } from "../locationContext";

function Page() {
  // Access userLocation from LocationContext
  const userLocation = useContext(LocationContext);

  return <LocationMap userLocation={userLocation} />;
}

export default Page;
