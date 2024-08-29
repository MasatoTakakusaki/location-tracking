import NodeGeocoder from "node-geocoder";

interface Options {
  provider: "google";
  apiKey: string;
}

const options: Options = {
  provider: "google",
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
};

const fetchAdapter = (url: string, init?: RequestInit) => fetch(url, init);
const geocoder = NodeGeocoder({ ...options, fetch: fetchAdapter });

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
