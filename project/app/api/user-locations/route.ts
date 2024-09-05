import { NextResponse } from "next/server";
import {
  getUserLocationController,
  postUserLocationController,
} from "../../controllers/userLocationController";

// http://XXX/api/user-locations

// Get all user locations
export async function GET() {
  try {
    const userLocations = await getUserLocationController();
    return NextResponse.json(userLocations);
  } catch (error) {
    console.error("Error fetching user locations:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Register a new user location
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lat, lng } = body;
    const result = await postUserLocationController(lat, lng);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error registering user location:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
