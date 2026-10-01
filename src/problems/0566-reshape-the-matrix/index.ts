/**
 * 566. Reshape the Matrix
 *
 * Reshapes the matrix `mat` into `r` rows and `c` columns, reading its
 * elements row by row. If it doesn't have exactly `r · c` elements, returns
 * it unchanged.
 *
 * Maps each element's position in row-major order to its new row and
 * column.
 *
 * @see https://leetcode.com/problems/reshape-the-matrix/
 * @difficulty Easy
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n) for the result
 *
 * @example
 * reshapeTheMatrix([[1, 2], [3, 4]], 1, 4); // [[1, 2, 3, 4]]
 */
export const reshapeTheMatrix = (
	mat: readonly (readonly number[])[],
	r: number,
	c: number,
): number[][] => {
	const n = mat[0]?.length ?? 0;
	if (mat.length * n !== r * c) return mat.map((row) => [...row]);
	return Array.from({ length: r }, (_, row) =>
		Array.from({ length: c }, (_, col) => {
			const index = row * c + col;
			return mat[Math.floor(index / n)]?.[index % n] ?? 0;
		}),
	);
};
