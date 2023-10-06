"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { isEmpty } from "@/utils/util";
import useScroll from "@/hooks/useScroll";
import Card from "@/components/Card";

export default function Home() {
	const [cards, setCards] = useState<Array<any>>([]);
	const [page, setPage] = useState(1);
	const [searchKey, setSearchKey] = useState("");
	const [loadingMore, setLoadingMore] = useState(false);

	const fetchData = useCallback(
		async (page: number) => {
			setLoadingMore(true);
			const res = await axios.post("/api/cards", {
				page,
				searchKey,
			});
			setCards((prevCards) => [...prevCards, ...res.data]);
			setLoadingMore(false);
		},
		[page, loadingMore]
	);

	useEffect(() => {
		fetchData(page);
	}, [page]);

	useScroll(() => {
		if (!loadingMore) setPage((prevPage) => prevPage + 1);
	});

	return (
		<main className="p-4">
			<nav className="p-1 bg-gray-100 flex justify-end items-center">
				{20 * page} / 1212
				<input
					className="border-2 border-gray-300 focus:border-blue-400 focus:shadow focus:ring-1 focus:ring-blue-300 outline-none px-4 py-1 rounded ml-2"
					placeholder="Search by name"
					value={searchKey}
					onChange={(e) => setSearchKey(e.target.value)}
					type="search"
				/>
			</nav>
			<div className="grid grid-cols-6 gap-x-8 gap-y-2 pr-64 pt-1 pl-4">
				{!isEmpty(cards) &&
					cards.map((card, index) => (
						<Card key={`card${index}`} {...card} />
					))}
			</div>
		</main>
	);
}
