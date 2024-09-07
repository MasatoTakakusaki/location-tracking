import "dotenv/config";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUserLocation() {
  const locations = [
    {
      latitude: 40.712776,
      longitude: -74.005974,
    }, // New York City, USA
    {
      latitude: 34.052235,
      longitude: -118.243683,
    }, // Los Angeles, USA
    {
      latitude: 35.699487,
      longitude: 139.692711,
    }, // Tokyo, Japan
    {
      latitude: 19.432608,
      longitude: -99.133209,
    }, // Mexico City, Mexico
    {
      latitude: 37.774929,
      longitude: -122.419418,
    }, // San Francisco, USA
    {
      latitude: 49.246292,
      longitude: -123.116226,
    }, // Vancouver, Canada
    {
      latitude: 49.256292,
      longitude: -123.126226,
    }, // Vancouver, Canada
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
