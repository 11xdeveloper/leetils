/**
 * 240. Search a 2D Matrix II
 *
 * Returns whether `target` is in an m×n matrix whose rows are sorted left to
 * right and whose columns are sorted top to bottom.
 *
 * Starts at the top-right corner, where everything to the left is smaller
 * and everything below is larger. A larger value there rules out its column;
 * a smaller one rules out its row. Each step removes a row or a column.
 *
 * @see https://leetcode.com/problems/search-a-2d-matrix-ii/
 * @difficulty Medium
 * @timeComplexity O(m + n)
 * @spaceComplexity O(1)
 *
 * @example
 * searchA2dMatrixII([[1, 4, 7], [2, 5, 8], [3, 6, 9]], 5); // true
 */
export const searchA2dMatrixII = (
	matrix: readonly (readonly number[])[],
	target: number,
): boolean => {
	let row = 0;
	let column = (matrix[0]?.length ?? 0) - 1;

	while (row < matrix.length && column >= 0) {
		const value = matrix[row]?.[column] ?? 0;
		if (value === target) return true;
		if (value > target) column--;
		else row++;
	}

	return false;
};
