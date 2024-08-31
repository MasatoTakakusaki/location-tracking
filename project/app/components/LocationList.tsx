import React from "react";

function LocationList({ locations }: LocationListProps) {
  return (
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
  );
}

export default LocationList;
