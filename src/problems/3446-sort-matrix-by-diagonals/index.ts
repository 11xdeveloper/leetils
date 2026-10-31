/**
 * 3446. Sort Matrix by Diagonals
 *
 * Sort each diagonal of a square matrix: those in the bottom-left triangle
 * (including the main one) in non-increasing order, the rest in
 * non-decreasing order.
 *
 * Gather each diagonal, sort it the right way, and write it back.
 *
 * @see https://leetcode.com/problems/sort-matrix-by-diagonals/
 * @difficulty Medium
 * @timeComplexity O(n² log n)
 * @spaceComplexity O(n²)
 *
 * @example
 * sortMatrixByDiagonals([[1, 7, 3], [9, 8, 2], [4, 5, 6]]); // [[8, 2, 3], [9, 6, 7], [4, 5, 1]]
 */
export const sortMatrixByDiagonals = (
	grid: readonly (readonly number[])[],
): number[][] => {
	const n = grid.length;
	const result = grid.map((row) => [...row]);
	for (let offset = -(n - 1); offset < n; offset++) {
		const cells: [number, number][] = [];
		for (let r = 0; r < n; r++) {
			const c = r + offset;
			if (c >= 0 && c < n) cells.push([r, c]);
		}
		const values = cells
			.map(([r, c]) => grid[r]?.[c] ?? 0)
			.sort((a, b) => (offset <= 0 ? b - a : a - b));
		cells.forEach(([r, c], i) => {
			const row = result[r];
			if (row) row[c] = values[i] ?? 0;
		});
	}
	return result;
};
