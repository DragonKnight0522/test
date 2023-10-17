import { NextRequest, NextResponse } from "next/server";
import locationData from "@/data/locations.json";

export async function GET(req: NextRequest) {
	try {
		const locations: LocationInfo[] = locationData;

		return NextResponse.json(locations);
	} catch (error) {
		return NextResponse.json({ status: 500, error: "An error occurred" });
	}
}
