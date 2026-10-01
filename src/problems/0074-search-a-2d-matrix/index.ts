/**
 * 74. Search a 2D Matrix
 *
 * Returns whether `target` is in an m×n matrix whose rows are each sorted,
 * and where each row starts after the previous row ends.
 *
 * Read row by row, the matrix is one sorted array, so a binary search over
 * indices `0` to `m * n - 1` finds the target, mapping each index to its row
 * and column.
 *
 * @see https://leetcode.com/problems/search-a-2d-matrix/
 * @difficulty Medium
 * @timeComplexity O(log(m * n))
 * @spaceComplexity O(1)
 *
 * @example
 * searchA2dMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3); // true
 */
export const searchA2dMatrix = (
	matrix: readonly (readonly number[])[],
	target: number,
): boolean => {
	const columns = matrix[0]?.length ?? 0;
	let low = 0;
	let high = matrix.length * columns - 1;

	while (low <= high) {
		const mid = Math.floor((low + high) / 2);
		const value = matrix[Math.floor(mid / columns)]?.[mid % columns] ?? 0;
		if (value === target) return true;
		if (value < target) low = mid + 1;
		else high = mid - 1;
	}

	return false;
};
