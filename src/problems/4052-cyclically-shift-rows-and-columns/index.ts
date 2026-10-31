/**
 * 4052. Cyclically Shift Rows and Columns
 *
 * Shifts each row of `grid` left by `rowShift[i]`, then each column up by
 * `colShift[j]`, both cyclically. Returns the result.
 *
 * @see https://leetcode.com/problems/cyclically-shift-rows-and-columns/
 * @difficulty Easy
 * @timeComplexity O(n²)
 * @spaceComplexity O(n²)
 *
 * @example
 * cyclicallyShiftRowsAndColumns(2, [[1, 2], [3, 4]], [1, 0], [0, 1]); // [[2, 4], [3, 1]]
 */
export const cyclicallyShiftRowsAndColumns = (
	n: number,
	grid: readonly (readonly number[])[],
	rowShift: readonly number[],
	colShift: readonly number[],
): number[][] => {
	const rows = grid.map((row, i) =>
		Array.from({ length: n }, (_, j) => row[(j + (rowShift[i] ?? 0)) % n] ?? 0),
	);
	return Array.from({ length: n }, (_, i) =>
		Array.from(
			{ length: n },
			(_, j) => rows[(i + (colShift[j] ?? 0)) % n]?.[j] ?? 0,
		),
	);
};
