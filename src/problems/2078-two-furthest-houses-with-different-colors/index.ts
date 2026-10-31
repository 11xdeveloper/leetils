/**
 * 2078. Two Furthest Houses With Different Colors
 *
 * Returns the largest distance between two houses of different colours.
 *
 * One of the two can always be an end of the street: find the furthest
 * house differing from the first, and from the last.
 *
 * @see https://leetcode.com/problems/two-furthest-houses-with-different-colors/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * twoFurthestHousesWithDifferentColors([1, 1, 1, 6, 1, 1, 1]); // 3
 */
export const twoFurthestHousesWithDifferentColors = (
	colors: readonly number[],
): number => {
	const n = colors.length;
	let best = 0;
	for (const [i, color] of colors.entries()) {
		if (color !== colors[0]) best = Math.max(best, i);
		if (color !== colors[n - 1]) best = Math.max(best, n - 1 - i);
	}
	return best;
};
