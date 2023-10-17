import { NextRequest, NextResponse } from "next/server";
import locationData from "@/data/locations.json";
import { calcScore } from "@/app/actions/controller";

export async function POST(req: NextRequest) {
	try {
		const searchParam: SearchParam = await req.json();
		const locations: LocationInfo[] = locationData;

		const res = await calcScore(locations, searchParam);
		return NextResponse.json(res);
	} catch (error) {
		console.log("error", error);
		return NextResponse.json({ status: 500, error: "An error occurred" });
	}
}
