import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Extract query parameters from the request URL
    const { searchParams } = new URL(req.url);
    const designation = searchParams.get("designation");
    const location = searchParams.get("location");

    // Validate required parameters
    if (!designation || !location) {
      return NextResponse.json({ error: "Designation and Location are required" }, { status: 400 });
    }

    // Ensure API key exists
    if (!process.env.RAPIDAPI_KEY) {
      return NextResponse.json({ error: "RapidAPI key is missing" }, { status: 500 });
    }

    // API request options
    const options = {
      method: "GET",
      url: "https://jsearch.p.rapidapi.com/estimated-salary",
      params: {
        job_title: designation, // Correct mapping
        location: location,
        location_type: "ANY",
        years_of_experience: "ALL",
      },
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY, // Secure API key usage
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
      },
    };

    // Make API request
    const response = await axios.request(options);

    // Return API response
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error fetching salary data:", error?.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to fetch job salary data", details: error?.response?.data || error.message },
      { status: 500 }
    );
  }
}
