import { NextResponse } from "next/server";
import { userLocationController } from "../../controllers/userLocationController";

// http://localhost:3000/api/user-locations

// Get all user locations
export async function GET() {
  try {
    const userLocations = await userLocationController();
    return NextResponse.json(userLocations);
  } catch (error) {
    console.error("Error fetching user locations:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
