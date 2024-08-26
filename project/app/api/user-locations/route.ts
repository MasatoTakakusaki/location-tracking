import { NextResponse } from "next/server";

export async function RegisterUserLocations() {
  const response = await fetch("http://localhost:3000/api/user-locations");
  return new Response(response.body, response);
}
