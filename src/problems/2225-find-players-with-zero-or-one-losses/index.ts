/**
 * 2225. Find Players With Zero or One Losses
 *
 * From match results `[winner, loser]`, returns the players who never
 * lost and those who lost exactly once, each in ascending order.
 *
 * Count losses for every player who played.
 *
 * @see https://leetcode.com/problems/find-players-with-zero-or-one-losses/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * findPlayersWithZeroOrOneLosses([[2, 3], [1, 3], [5, 4], [6, 4]]); // [[1, 2, 5, 6], []]
 */
export const findPlayersWithZeroOrOneLosses = (
	matches: readonly (readonly number[])[],
): number[][] => {
	const losses = new Map<number, number>();
	for (const [winner = 0, loser = 0] of matches) {
		losses.set(winner, losses.get(winner) ?? 0);
		losses.set(loser, (losses.get(loser) ?? 0) + 1);
	}
	const withLosses = (count: number): number[] =>
		[...losses]
			.filter(([, l]) => l === count)
			.map(([player]) => player)
			.sort((a, b) => a - b);
	return [withLosses(0), withLosses(1)];
};
