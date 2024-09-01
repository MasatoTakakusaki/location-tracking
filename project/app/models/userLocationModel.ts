import { prisma } from "../../prisma/prismaClient";

// Fetch all user locations from the database
export const getUserLocationModel = async () => {
  try {
    return await prisma.userLocation.findMany({
      select: {
        latitude: true,
        longitude: true,
      },
    });
  } catch (error) {
    console.error("Error fetching user locations:", error);
    return { error: "Internal Server Error" };
  }
};

// Register a new user location in the database
export const postUserLocationModel = async (
  latitude: number,
  longitude: number
) => {
  try {
    return await prisma.userLocation.create({
      data: {
        latitude,
        longitude,
      },
    });
  } catch (error) {
    console.error("Error registering user location:", error);
    return { error: "Internal Server Error" };
  }
};
