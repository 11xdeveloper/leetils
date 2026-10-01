/**
 * 48. Rotate Image
 *
 * Rotates an n×n matrix 90 degrees clockwise, in place, as the problem
 * requires.
 *
 * A clockwise rotation is a transpose (swapping across the main diagonal)
 * followed by reversing each row.
 *
 * @see https://leetcode.com/problems/rotate-image/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(1)
 *
 * @example
 * const matrix = [[1, 2], [3, 4]];
 * rotateImage(matrix); // matrix is now [[3, 1], [4, 2]]
 */
export const rotateImage = (matrix: number[][]): void => {
	for (const [i, row] of matrix.entries()) {
		for (let j = i + 1; j < row.length; j++) {
			const other = matrix[j];
			if (!other) continue;
			const temp = row[j] ?? 0;
			row[j] = other[i] ?? 0;
			other[i] = temp;
		}
	}

	for (const row of matrix) row.reverse();
};
