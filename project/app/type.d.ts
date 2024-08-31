type LocationType = {
  lat: number;
  lng: number;
};

type UserLocationType = {
  locationName: {
    city: string | null;
    region: string | null;
    country: string | null;
  };
  latitude: number;
  longitude: number;
  count: number;
};

type LocationListProps = {
  locations: UserLocationType[];
};
