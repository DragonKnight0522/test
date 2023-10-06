import { NextRequest, NextResponse } from "next/server";
import cardsJson from "@/data/cards.json";

type Card = {
	id: number;
	image: string;
	title: string;
	content: string;
	category: string;
	type: string;
};

export async function POST(req: NextRequest) {
	try {
		const { page, searchKey } = await req.json();

		// Connect DB and get cards from database by page and search key
		const cards: Card[] = cardsJson;

		return NextResponse.json(cards);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ status: 500, error: "An error occurred" });
	}
}
