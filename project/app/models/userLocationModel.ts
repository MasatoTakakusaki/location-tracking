import { prisma } from "../../prisma/prismaClient";

// Fetch all user locations from the database
export const userLocationModel = async () => {
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
