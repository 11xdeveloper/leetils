/**
 * 2410. Maximum Matching of Players With Trainers
 *
 * A player matches a trainer whose capacity is at least their ability;
 * each takes at most one partner. Returns the most matches.
 *
 * Sort both and give each player, weakest first, the weakest trainer that
 * fits.
 *
 * @see https://leetcode.com/problems/maximum-matching-of-players-with-trainers/
 * @difficulty Medium
 * @timeComplexity O(n log n + m log m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * maximumMatchingOfPlayersWithTrainers([4, 7, 9], [8, 2, 5, 8]); // 2
 */
export const maximumMatchingOfPlayersWithTrainers = (
	players: readonly number[],
	trainers: readonly number[],
): number => {
	const sortedTrainers = trainers.toSorted((a, b) => a - b);
	let [matches, t] = [0, 0];
	for (const player of players.toSorted((a, b) => a - b)) {
		while (t < sortedTrainers.length && (sortedTrainers[t] ?? 0) < player) t++;
		if (t === sortedTrainers.length) break;
		matches++;
		t++;
	}
	return matches;
};
