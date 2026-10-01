/**
 * 118. Pascal's Triangle
 *
 * Returns the first `numRows` rows of Pascal's triangle, where each number is
 * the sum of the two numbers above it.
 *
 * Builds each row from the one before: 1 at each end, and the sum of each
 * adjacent pair in between.
 *
 * @see https://leetcode.com/problems/pascals-triangle/
 * @difficulty Easy
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n^2) for the returned rows
 *
 * @example
 * pascalsTriangle(5); // [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]
 */
export const pascalsTriangle = (numRows: number): number[][] => {
	const rows: number[][] = [];

	for (let r = 0; r < numRows; r++) {
		const above = rows[r - 1] ?? [];
		rows.push(
			Array.from({ length: r + 1 }, (_, i) =>
				i === 0 || i === r ? 1 : (above[i - 1] ?? 0) + (above[i] ?? 0),
			),
		);
	}

	return rows;
};
