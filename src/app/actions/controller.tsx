export async function calcScore(
	locations: LocationInfo[],
	search: SearchParam
): Promise<LocationInfo[]> {
	let temp = locations;
	// Iterate through each location
	for (let i = 0; i < temp.length; i++) {
		// In each location, iterate through each feature
		for (let j = 0; j < temp[i].features.length; j++) {
			// If the feature is in the search criteria, increment the location's score
			if (search.criteria.includes(temp[i].features[j])) {
				temp[i].score++;
			}
		}
	}

	// Sort the locations from highest score to lowest
	temp.sort((a, b) => b.score - a.score);

	// If there are more than 5 locations
	if (temp.length > 5) {
		temp = temp.slice(0, 5); // Keep only the top 5
	}

	return Promise.resolve(temp);
}
