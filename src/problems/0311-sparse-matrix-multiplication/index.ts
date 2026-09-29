/**
 * 311. Sparse Matrix Multiplication
 *
 * Returns the product of an m×k matrix and a k×n matrix, both mostly zeros.
 *
 * Standard multiplication reordered so each non-zero `mat1[i][p]` is
 * multiplied into row `i` of the result by row `p` of `mat2`. Zeros in
 * `mat1` are skipped entirely, as are zeros in `mat2`'s rows.
 *
 * @see https://leetcode.com/problems/sparse-matrix-multiplication/
 * @difficulty Medium
 * @timeComplexity O(m * k * n) in the worst case, far less for sparse inputs
 * @spaceComplexity O(m * n) for the result
 *
 * @example
 * sparseMatrixMultiplication([[1, 0, 0], [-1, 0, 3]], [[7, 0, 0], [0, 0, 0], [0, 0, 1]]); // [[7, 0, 0], [-7, 0, 3]]
 */
export const sparseMatrixMultiplication = (
	mat1: readonly (readonly number[])[],
	mat2: readonly (readonly number[])[],
): number[][] => {
	const columns = mat2[0]?.length ?? 0;

	return mat1.map((row) => {
		const product = new Array<number>(columns).fill(0);
		for (const [p, a] of row.entries()) {
			if (a === 0) continue;
			for (const [j, b] of (mat2[p] ?? []).entries()) {
				if (b !== 0) product[j] = (product[j] ?? 0) + a * b;
			}
		}
		return product;
	});
};
