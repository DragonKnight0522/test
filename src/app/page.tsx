"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { isEmpty } from "@/utils/util";
export default function Home() {
	const [searchStr, setSearchStr] = useState<string>("Mountain,Sea,Museum");
	const [locations, setLocations] = useState<LocationInfo[]>([]);
	const [allLocations, setAllLocations] = useState<LocationInfo[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await axios.get("/api/location");
			setAllLocations(res.data);
		};
		fetchData();
	}, []);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchStr(event.target.value);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Split the searchStr using comma as separator
		const searchParam = searchStr.split(",");

		try {
			const res = await axios.post("/api/search", {
				criteria: searchParam,
			});
			setLocations(res.data);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<main className="m-auto mt-4 flex items-center">
			<table className="m-auto">
				<thead>
					<tr>
						<th>Name</th>
						<th>Features</th>
					</tr>
				</thead>
				<tbody>
					{!isEmpty(allLocations) &&
						allLocations.map((location, index) => (
							<tr key={"location" + index}>
								<td className="pr-4">{location.name}</td>
								<td className="px-4">
									{location.features.join(",")}
								</td>
							</tr>
						))}
				</tbody>
			</table>

			<form onSubmit={handleSubmit}>
				<input
					className="border"
					type="text"
					value={searchStr}
					onChange={handleInputChange}
				/>
				<button type="submit">Search</button>
			</form>

			<table className="m-auto">
				<thead>
					<tr>
						<th>Name</th>
						<th>Score</th>
					</tr>
				</thead>
				<tbody>
					{!isEmpty(locations) &&
						locations.map((location, index) => (
							<tr key={"location" + index}>
								<td className="pr-4">{location.name}</td>
								<td className="pl-4">{location.score}</td>
							</tr>
						))}
				</tbody>
			</table>
		</main>
	);
}
