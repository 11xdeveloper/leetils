/**
 * 63. Unique Paths II
 *
 * Returns how many paths a robot can take from the top-left to the
 * bottom-right corner of a grid, moving only right or down, where cells
 * marked 1 are obstacles it can't enter.
 *
 * Dynamic programming over one row at a time: the paths into a cell are the
 * paths into the cell above plus the cell to its left, or 0 for an obstacle.
 *
 * @see https://leetcode.com/problems/unique-paths-ii/
 * @difficulty Medium
 * @timeComplexity O(m * n)
 * @spaceComplexity O(n)
 *
 * @example
 * uniquePathsII([[0, 0, 0], [0, 1, 0], [0, 0, 0]]); // 2
 */
export const uniquePathsII = (
	obstacleGrid: readonly (readonly number[])[],
): number => {
	const columns = obstacleGrid[0]?.length ?? 0;
	const paths = new Array<number>(columns).fill(0);
	paths[0] = 1;

	for (const row of obstacleGrid) {
		for (const [c, cell] of row.entries()) {
			if (cell === 1) paths[c] = 0;
			else if (c > 0) paths[c] = (paths[c] ?? 0) + (paths[c - 1] ?? 0);
		}
	}

	return paths.at(-1) ?? 0;
};
