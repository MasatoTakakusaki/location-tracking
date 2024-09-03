import React from "react";

function LocationList({ locations }: LocationListProps) {
  return (
    <div className="overflow-x-auto mb-12">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-blue-100 text-black-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">City</th>
            <th className="py-3 px-6 text-left">Region</th>
            <th className="py-3 px-6 text-left">Country</th>
            <th className="py-3 px-6 text-left">Count</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {locations.map((location) => {
            const { locationName, count } = location;
            const { city, region, country } = locationName || {};
            const id = `${city}-${country}`;

            return (
              <tr
                key={id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {city}
                </td>
                <td className="py-3 px-6 text-left">{region}</td>
                <td className="py-3 px-6 text-left">{country}</td>
                <td className="py-3 px-6 text-center">{count}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default LocationList;
