import "dotenv/config";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUserLocation() {
  const locations = [
    { latitude: 31.2089779, longitude: 120.8201818 }, // Suzhou, China
    { latitude: 40.712776, longitude: -74.005974 }, // New York City, USA
    { latitude: 34.052235, longitude: -118.243683 }, // Los Angeles, USA
    { latitude: 51.507351, longitude: -0.127758 }, // London, UK
    { latitude: 35.689487, longitude: 139.691711 }, // Tokyo, Japan
    { latitude: 35.689487, longitude: 139.691711 }, // Tokyo, Japan
    { latitude: -33.86882, longitude: 151.20929 }, // Sydney, Australia
    { latitude: 48.856613, longitude: 2.352222 }, // Paris, France
    { latitude: 52.520008, longitude: 13.404954 }, // Berlin, Germany
    { latitude: 19.432608, longitude: -99.133209 }, // Mexico City, Mexico
    { latitude: -23.55052, longitude: -46.633308 }, // São Paulo, Brazil
    { latitude: -34.603722, longitude: -58.381592 }, // Buenos Aires, Argentina
    { latitude: 55.755825, longitude: 37.617298 }, // Moscow, Russia
    { latitude: 39.904202, longitude: 116.407394 }, // Beijing, China
    { latitude: 37.774929, longitude: -122.419418 }, // San Francisco, USA
    { latitude: 1.352083, longitude: 103.819839 }, // Singapore
    { latitude: 41.902782, longitude: 12.496366 }, // Rome, Italy
    { latitude: 19.07609, longitude: 72.877426 }, // Mumbai, India
    { latitude: 3.139003, longitude: 101.686852 }, // Kuala Lumpur, Malaysia
    { latitude: -6.208763, longitude: 106.845599 }, // Jakarta, Indonesia
    { latitude: 49.246292, longitude: -123.116226 }, // Vancouver, Canada
    { latitude: 49.246292, longitude: -123.116226 }, // Vancouver, Canada
    { latitude: 49.246292, longitude: -123.116226 }, // Vancouver, Canada
  ];

  await prisma.userLocation.createMany({
    data: locations,
  });
}

async function deleteAll(table: Uncapitalize<Prisma.ModelName>) {
  // @ts-ignore
  await prisma[table].deleteMany({});
}

async function main() {
  {
    await deleteAll("userLocation");
  }

  {
    await insertUserLocation();
  }
}

main();
