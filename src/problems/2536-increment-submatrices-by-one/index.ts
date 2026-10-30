/**
 * 2536. Increment Submatrices by One
 *
 * Starting from an `n × n` zero matrix, each query `[row1, col1, row2,
 * col2]` adds one to every cell of that submatrix. Returns the result.
 *
 * Mark each query's start and end in a difference array per row, then
 * take prefix sums along each row.
 *
 * @see https://leetcode.com/problems/increment-submatrices-by-one/
 * @difficulty Medium
 * @timeComplexity O(n² + q · n)
 * @spaceComplexity O(n²)
 *
 * @example
 * incrementSubmatricesByOne(2, [[0, 0, 1, 1]]); // [[1, 1], [1, 1]]
 */
export const incrementSubmatricesByOne = (
	n: number,
	queries: readonly (readonly number[])[],
): number[][] => {
	const matrix = Array.from({ length: n }, () =>
		Array.from({ length: n + 1 }, () => 0),
	);
	for (const [row1 = 0, col1 = 0, row2 = 0, col2 = 0] of queries)
		for (let r = row1; r <= row2; r++) {
			const row = matrix[r] ?? [];
			row[col1] = (row[col1] ?? 0) + 1;
			row[col2 + 1] = (row[col2 + 1] ?? 0) - 1;
		}
	for (const row of matrix) {
		for (let c = 1; c < n; c++) row[c] = (row[c] ?? 0) + (row[c - 1] ?? 0);
		row.pop();
	}
	return matrix;
};
