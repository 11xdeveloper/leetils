/**
 * 840. Magic Squares In Grid
 *
 * Counts the 3 × 3 subgrids of `grid` that are magic squares: the numbers 1
 * to 9 once each, with every row, column and both diagonals summing to 15.
 *
 * Checks every 3 × 3 window. A magic square always has 5 in the middle,
 * which rules out most windows quickly.
 *
 * @see https://leetcode.com/problems/magic-squares-in-grid/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(1)
 *
 * @example
 * magicSquaresInGrid([[4, 3, 8, 4], [9, 5, 1, 9], [2, 7, 6, 2]]); // 1
 */
export const magicSquaresInGrid = (
	grid: readonly (readonly number[])[],
): number => {
	let count = 0;
	for (let r = 0; r + 3 <= grid.length; r++) {
		for (let c = 0; c + 3 <= (grid[0]?.length ?? 0); c++) {
			if (grid[r + 1]?.[c + 1] !== 5) continue;
			const cell = (i: number, j: number): number => grid[r + i]?.[c + j] ?? 0;
			const values = [0, 1, 2].flatMap((i) => [0, 1, 2].map((j) => cell(i, j)));
			if (values.toSorted((a, b) => a - b).join() !== "1,2,3,4,5,6,7,8,9")
				continue;
			const lines = [
				...[0, 1, 2].map((i) => cell(i, 0) + cell(i, 1) + cell(i, 2)),
				...[0, 1, 2].map((j) => cell(0, j) + cell(1, j) + cell(2, j)),
				cell(0, 0) + cell(1, 1) + cell(2, 2),
				cell(0, 2) + cell(1, 1) + cell(2, 0),
			];
			if (lines.every((sum) => sum === 15)) count++;
		}
	}
	return count;
};
