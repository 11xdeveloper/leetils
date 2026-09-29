/**
 * 54. Spiral Matrix
 *
 * Returns the elements of an m×n matrix in clockwise spiral order, starting
 * from the top-left corner.
 *
 * Walks the outer ring (top row, right column, bottom row, left column),
 * then shrinks the boundaries and repeats. The checks before the bottom row
 * and left column stop a single remaining row or column being read twice.
 *
 * @see https://leetcode.com/problems/spiral-matrix/
 * @difficulty Medium
 * @timeComplexity O(m * n)
 * @spaceComplexity O(1) excluding the returned array
 *
 * @example
 * spiralMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]); // [1, 2, 3, 6, 9, 8, 7, 4, 5]
 */
export const spiralMatrix = (
	matrix: readonly (readonly number[])[],
): number[] => {
	const order: number[] = [];
	const at = (row: number, column: number): number =>
		matrix[row]?.[column] ?? 0;

	let top = 0;
	let bottom = matrix.length - 1;
	let left = 0;
	let right = (matrix[0]?.length ?? 0) - 1;

	while (top <= bottom && left <= right) {
		for (let c = left; c <= right; c++) order.push(at(top, c));
		for (let r = top + 1; r <= bottom; r++) order.push(at(r, right));
		if (top < bottom) {
			for (let c = right - 1; c >= left; c--) order.push(at(bottom, c));
		}
		if (left < right) {
			for (let r = bottom - 1; r > top; r--) order.push(at(r, left));
		}
		top++;
		bottom--;
		left++;
		right--;
	}

	return order;
};
