import { userLocationModel } from "../models/userLocationModel";
import { getLocationName } from "../lib/actions/getLocation";

interface UserLocation {
  latitude: number;
  longitude: number;
  locationName: {
    city: string | null;
    region: string | null;
    country: string | null;
  } | null;
  count: number;
}

export const userLocationController = async () => {
  try {
    const userLatsLongs = await userLocationModel();

    if (!Array.isArray(userLatsLongs)) {
      return userLatsLongs;
    }

    // Specify the city and country of each user location
    const userLocations: UserLocation[] = await Promise.all(
      userLatsLongs.map(async (userLatLong) => {
        const { latitude, longitude } = userLatLong;
        const locationName = await getLocationName(latitude, longitude);
        return { locationName, ...userLatLong, count: 1 };
      })
    );

    // Increase count when duplicating user locations city
    const data = userLocations.reduce<UserLocation[]>((acc, userLocation) => {
      const existingLocation = acc.find(
        (l) =>
          l.locationName?.city === userLocation.locationName?.city &&
          l.locationName?.country === userLocation.locationName?.country
      );
      if (existingLocation) {
        existingLocation.count += 1;
      } else {
        acc.push(userLocation);
      }
      return acc;
    }, []);

    return data;
  } catch (error) {
    console.error("Error fetching user locations:", error);
    return { error: "Internal Server Error" };
  }
};
