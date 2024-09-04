import NodeGeocoder from "node-geocoder";
import fetch, { RequestInfo, RequestInit, Response } from "node-fetch";

// Define the Options interface with the correct provider type
interface Options {
  provider: "google";
  apiKey: string;
}

// Set up the options for NodeGeocoder
const options: Options = {
  provider: "google",
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
};

// Create a fetchAdapter to ensure type compatibility
const fetchAdapter = (url: RequestInfo, init?: RequestInit) => {
  return fetch(url, init) as Promise<Response>;
};

// Initialize the geocoder with the fetchAdapter
const geocoder = NodeGeocoder({
  ...options,
  fetch: fetchAdapter as typeof fetch,
});

export async function getLocationName(lat: number, lng: number) {
  try {
    const response = await geocoder.reverse({ lat, lon: lng });
    const { city, country, administrativeLevels } = response[0];
    const cityName =
      city ||
      administrativeLevels?.level2short ||
      administrativeLevels?.level1short ||
      null;
    const regionName = administrativeLevels?.level1short || null;
    const countryName = country || null;
    const data = { city: cityName, region: regionName, country: countryName };
    return data;
  } catch (error) {
    console.error("Error fetching city name:", error);
    return null;
  }
}
