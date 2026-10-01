/**
 * 750. Number Of Corner Rectangles
 *
 * Counts the axis-aligned rectangles whose four corners are distinct 1s in
 * the binary `grid`.
 *
 * A rectangle is a pair of rows sharing two columns of 1s. Going row by
 * row, every pair of columns with 1s in the current row forms a rectangle
 * with each earlier row that also had 1s in both; a count per column pair
 * tracks how many earlier rows did.
 *
 * @see https://leetcode.com/problems/number-of-corner-rectangles/
 * @difficulty Medium
 * @timeComplexity O(m · k^2) where k is the most 1s in a row
 * @spaceComplexity O(n^2)
 *
 * @example
 * numberOfCornerRectangles([[1, 1, 1], [1, 1, 1], [1, 1, 1]]); // 9
 */
export const numberOfCornerRectangles = (
	grid: readonly (readonly number[])[],
): number => {
	const n = grid[0]?.length ?? 0;
	const pairs = new Int32Array(n * n);
	let rectangles = 0;

	for (const row of grid) {
		const ones = row.flatMap((cell, col) => (cell === 1 ? [col] : []));
		for (let i = 0; i < ones.length; i++) {
			for (let j = i + 1; j < ones.length; j++) {
				const key = (ones[i] ?? 0) * n + (ones[j] ?? 0);
				rectangles += pairs[key] ?? 0;
				pairs[key] = (pairs[key] ?? 0) + 1;
			}
		}
	}

	return rectangles;
};
