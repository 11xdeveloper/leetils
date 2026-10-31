/**
 * 3128. Right Triangles
 *
 * Count triples of 1-cells where one shares a row with a second and a
 * column with the third.
 *
 * Each 1-cell is the corner of (other 1s in its row) × (other 1s in its
 * column) triangles.
 *
 * @see https://leetcode.com/problems/right-triangles/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m + n)
 *
 * @example
 * rightTriangles([[0, 1, 0], [0, 1, 1], [0, 1, 0]]); // 2
 */
export const rightTriangles = (
	grid: readonly (readonly number[])[],
): number => {
	const rows = grid.map((row) => row.reduce((a, b) => a + b, 0));
	const cols = (grid[0] ?? []).map((_, c) =>
		grid.reduce((sum, row) => sum + (row[c] ?? 0), 0),
	);
	let total = 0;
	grid.forEach((row, r) => {
		row.forEach((cell, c) => {
			if (cell === 1) total += ((rows[r] ?? 0) - 1) * ((cols[c] ?? 0) - 1);
		});
	});
	return total;
};
