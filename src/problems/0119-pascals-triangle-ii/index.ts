/**
 * 119. Pascal's Triangle II
 *
 * Returns row `rowIndex` (counting from 0) of Pascal's triangle.
 *
 * Updates a single row in place from right to left, so each value is added
 * to before the value to its left changes.
 *
 * @see https://leetcode.com/problems/pascals-triangle-ii/
 * @difficulty Easy
 * @timeComplexity O(k^2) where k is rowIndex
 * @spaceComplexity O(k)
 *
 * @example
 * pascalsTriangleII(3); // [1, 3, 3, 1]
 */
export const pascalsTriangleII = (rowIndex: number): number[] => {
	const row = new Array<number>(rowIndex + 1).fill(0);
	row[0] = 1;

	for (let r = 1; r <= rowIndex; r++) {
		for (let i = r; i >= 1; i--) row[i] = (row[i] ?? 0) + (row[i - 1] ?? 0);
	}

	return row;
};
