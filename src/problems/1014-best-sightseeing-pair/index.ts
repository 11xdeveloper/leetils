/**
 * 1014. Best Sightseeing Pair
 *
 * The pair of spots `i < j` scores `values[i] + values[j] + i - j`. Returns
 * the best score.
 *
 * The score splits into `values[i] + i` and `values[j] - j`, so each `j`
 * pairs with the best `values[i] + i` seen before it.
 *
 * @see https://leetcode.com/problems/best-sightseeing-pair/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * bestSightseeingPair([8, 1, 5, 2, 6]); // 11
 */
export const bestSightseeingPair = (values: readonly number[]): number => {
	let best = Number.NEGATIVE_INFINITY;
	let bestStart = (values[0] ?? 0) + 0;
	for (let j = 1; j < values.length; j++) {
		best = Math.max(best, bestStart + (values[j] ?? 0) - j);
		bestStart = Math.max(bestStart, (values[j] ?? 0) + j);
	}
	return best;
};
