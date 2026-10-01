/**
 * 64. Minimum Path Sum
 *
 * Returns the smallest sum of the numbers along a path from the top-left to
 * the bottom-right corner of a grid of non-negative numbers, moving only
 * right or down.
 *
 * Dynamic programming over one row at a time: the cheapest path into a cell
 * comes from the cheaper of the cell above and the cell to its left.
 *
 * @see https://leetcode.com/problems/minimum-path-sum/
 * @difficulty Medium
 * @timeComplexity O(m * n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumPathSum([[1, 3, 1], [1, 5, 1], [4, 2, 1]]); // 7, along 1 → 3 → 1 → 1 → 1
 */
export const minimumPathSum = (
	grid: readonly (readonly number[])[],
): number => {
	const columns = grid[0]?.length ?? 0;
	const sums = new Array<number>(columns).fill(Number.POSITIVE_INFINITY);
	sums[0] = 0;

	for (const row of grid) {
		for (const [c, cell] of row.entries()) {
			const fromLeft = c > 0 ? (sums[c - 1] ?? 0) : Number.POSITIVE_INFINITY;
			sums[c] = cell + Math.min(sums[c] ?? 0, fromLeft);
		}
	}

	return sums.at(-1) ?? 0;
};
