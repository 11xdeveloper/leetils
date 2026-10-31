/**
 * 2371. Minimize Maximum Value in a Grid
 *
 * Replaces the distinct positive values of `grid` with positive integers,
 * keeping the order within every row and column, so the largest is as
 * small as possible.
 *
 * Assign values in increasing order of the originals; each gets one more
 * than the largest already assigned in its row or column.
 *
 * @see https://leetcode.com/problems/minimize-maximum-value-in-a-grid/
 * @difficulty Hard
 * @timeComplexity O(m · n log(m · n))
 * @spaceComplexity O(m · n)
 *
 * @example
 * minimizeMaximumValueInAGrid([[3, 1], [2, 5]]); // [[2, 1], [1, 2]]
 */
export const minimizeMaximumValueInAGrid = (
	grid: readonly (readonly number[])[],
): number[][] => {
	const [m, n] = [grid.length, grid[0]?.length ?? 0];
	const cells = Array.from({ length: m * n }, (_, i) => i).sort(
		(a, b) =>
			(grid[Math.floor(a / n)]?.[a % n] ?? 0) -
			(grid[Math.floor(b / n)]?.[b % n] ?? 0),
	);
	const [rowMax, colMax] = [
		new Array<number>(m).fill(0),
		new Array<number>(n).fill(0),
	];
	const result = grid.map((row) => row.map(() => 0));
	for (const cell of cells) {
		const [r, c] = [Math.floor(cell / n), cell % n];
		const value = Math.max(rowMax[r] ?? 0, colMax[c] ?? 0) + 1;
		(result[r] ?? [])[c] = value;
		rowMax[r] = value;
		colMax[c] = value;
	}
	return result;
};
