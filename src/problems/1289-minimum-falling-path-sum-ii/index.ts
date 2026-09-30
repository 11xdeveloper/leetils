/**
 * 1289. Minimum Falling Path Sum II
 *
 * Picks one element from each row of the square `grid`, never the same
 * column in neighbouring rows, and returns the smallest possible sum.
 *
 * Dynamic programming row by row. Each cell adds the best path into the row
 * above, unless that path ends in the same column, in which case it takes
 * the second best. So only the two smallest sums per row are needed.
 *
 * @see https://leetcode.com/problems/minimum-falling-path-sum-ii/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumFallingPathSumII([[1, 2, 3], [4, 5, 6], [7, 8, 9]]); // 13
 */
export const minimumFallingPathSumII = (
	grid: readonly (readonly number[])[],
): number => {
	let sums = [...(grid[0] ?? [])];
	for (const row of grid.slice(1)) {
		let [first, second, firstColumn] = [Infinity, Infinity, -1];
		sums.forEach((sum, c) => {
			if (sum < first) [second, first, firstColumn] = [first, sum, c];
			else if (sum < second) second = sum;
		});
		sums = row.map((value, c) => value + (c === firstColumn ? second : first));
	}
	return Math.min(...sums);
};
