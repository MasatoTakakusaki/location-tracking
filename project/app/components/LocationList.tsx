import { useState, useEffect } from "react";

function LocationList() {
  const [locations, setLocations] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Fetch user locations
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
  }, []);

  return isLoaded ? (
    <>
      <table>
        <thead>
          <tr>
            <th>City</th>
            <th>Region</th>
            <th>Country</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => {
            const { locationName, count } = location;
            const { city, region, country } = locationName || {};
            const id = `${city}-${country}`;

            return (
              <tr key={id}>
                <td>{city}</td>
                <td>{region}</td>
                <td>{country}</td>
                <td>{count}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  ) : null;
}

// GET all user locations data
export const getAllUserLocations = async () => {
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

export default LocationList;
