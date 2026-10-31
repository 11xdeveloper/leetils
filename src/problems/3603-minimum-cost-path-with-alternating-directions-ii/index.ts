/**
 * 3603. Minimum Cost Path with Alternating Directions II
 *
 * Start at the top-left of an m × n grid, paying 1. Moves go right or
 * down, entering cell (i, j) costs (i + 1)(j + 1), and between moves you
 * wait one second at your cell, paying its `waitCost`. Returns the least
 * total cost to reach the bottom-right.
 *
 * Every cell strictly between the start and the end costs its entry plus
 * its wait, so a path DP over the grid finds the cheapest.
 *
 * @see https://leetcode.com/problems/minimum-cost-path-with-alternating-directions-ii/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumCostPathWithAlternatingDirectionsII(2, 2, [[3, 5], [2, 4]]); // 9
 */
export const minimumCostPathWithAlternatingDirectionsII = (
	m: number,
	n: number,
	waitCost: readonly (readonly number[])[],
): number => {
	const row = new Array<number>(n).fill(Number.POSITIVE_INFINITY);
	for (let i = 0; i < m; i++)
		for (let j = 0; j < n; j++) {
			const entry = (i + 1) * (j + 1);
			if (i === 0 && j === 0) {
				row[j] = entry;
				continue;
			}
			const before = Math.min(
				row[j] ?? Number.POSITIVE_INFINITY,
				j > 0 ? (row[j - 1] ?? 0) : Number.POSITIVE_INFINITY,
			);
			const wait = i === m - 1 && j === n - 1 ? 0 : (waitCost[i]?.[j] ?? 0);
			row[j] = before + entry + wait;
		}
	return row[n - 1] ?? 0;
};
