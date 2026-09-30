/**
 * 931. Minimum Falling Path Sum
 *
 * A falling path starts anywhere in the first row of the `n × n` `matrix`
 * and moves down one row at a time, to the cell below or diagonally
 * adjacent. Returns the smallest sum of such a path.
 *
 * Row by row, each cell's best path is its value plus the best of the up to
 * three cells above it.
 *
 * @see https://leetcode.com/problems/minimum-falling-path-sum/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumFallingPathSum([[2, 1, 3], [6, 5, 4], [7, 8, 9]]); // 13
 */
export const minimumFallingPathSum = (
	matrix: readonly (readonly number[])[],
): number => {
	let best = [...(matrix[0] ?? [])];
	for (const row of matrix.slice(1)) {
		best = row.map(
			(value, c) =>
				value +
				Math.min(
					best[c - 1] ?? Number.POSITIVE_INFINITY,
					best[c] ?? Number.POSITIVE_INFINITY,
					best[c + 1] ?? Number.POSITIVE_INFINITY,
				),
		);
	}
	return Math.min(...best);
};
