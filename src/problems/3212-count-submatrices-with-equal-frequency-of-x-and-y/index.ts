/**
 * 3212. Count Submatrices With Equal Frequency of X and Y
 *
 * Count the submatrices containing the top-left cell that have as many `X`s
 * as `Y`s and at least one `X`.
 *
 * Such submatrices are prefix rectangles. Keep running column sums of X
 * minus Y and of X alone, row by row.
 *
 * @see https://leetcode.com/problems/count-submatrices-with-equal-frequency-of-x-and-y/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(n)
 *
 * @example
 * countSubmatricesWithEqualFrequencyOfXAndY([["X", "Y", "."], ["Y", ".", "."]]); // 3
 */
export const countSubmatricesWithEqualFrequencyOfXAndY = (
	grid: readonly (readonly string[])[],
): number => {
	const n = grid[0]?.length ?? 0;
	const balance = new Int32Array(n);
	const xs = new Int32Array(n);
	let count = 0;
	for (const row of grid) {
		let rowBalance = 0;
		let rowXs = 0;
		row.forEach((cell, c) => {
			if (cell === "X") {
				balance[c] = (balance[c] ?? 0) + 1;
				xs[c] = (xs[c] ?? 0) + 1;
			} else if (cell === "Y") balance[c] = (balance[c] ?? 0) - 1;
			rowBalance += balance[c] ?? 0;
			rowXs += xs[c] ?? 0;
			if (rowBalance === 0 && rowXs > 0) count++;
		});
	}
	return count;
};
