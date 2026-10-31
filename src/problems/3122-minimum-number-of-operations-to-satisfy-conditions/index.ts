/**
 * 3122. Minimum Number of Operations to Satisfy Conditions
 *
 * The fewest cells of the digit grid to change so every column is a single
 * value and neighbouring columns differ.
 *
 * Count each digit per column, then dynamic programming across columns over
 * the digit chosen for the previous one.
 *
 * @see https://leetcode.com/problems/minimum-number-of-operations-to-satisfy-conditions/
 * @difficulty Medium
 * @timeComplexity O(m · n + 100 n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumNumberOfOperationsToSatisfyConditions([[1, 0, 2], [1, 0, 2]]); // 0
 */
export const minimumNumberOfOperationsToSatisfyConditions = (
	grid: readonly (readonly number[])[],
): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	let best = new Array<number>(10).fill(0);
	for (let c = 0; c < n; c++) {
		const counts = new Array<number>(10).fill(0);
		for (const row of grid)
			counts[row[c] ?? 0] = (counts[row[c] ?? 0] ?? 0) + 1;
		best = counts.map((count, digit) => {
			let previous = Number.POSITIVE_INFINITY;
			for (let other = 0; other < 10; other++)
				if (other !== digit) previous = Math.min(previous, best[other] ?? 0);
			return previous + m - count;
		});
	}
	return Math.min(...best);
};
