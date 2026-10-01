/**
 * 861. Score After Flipping Matrix
 *
 * Each move toggles every bit in a row or a column of the binary `grid`.
 * Returns the highest possible score, where each row is read as a binary
 * number and the rows are added.
 *
 * The leading bit is worth more than all others combined, so every row is
 * flipped to start with 1. Then each other column is flipped if that gives
 * it more 1s.
 *
 * @see https://leetcode.com/problems/score-after-flipping-matrix/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(1)
 *
 * @example
 * scoreAfterFlippingMatrix([[0, 0, 1, 1], [1, 0, 1, 0], [1, 1, 0, 0]]); // 39
 */
export const scoreAfterFlippingMatrix = (
	grid: readonly (readonly number[])[],
): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	let score = 0;
	for (let c = 0; c < n; c++) {
		// The 1s in column c once every row has been flipped to start with 1.
		let ones = 0;
		for (const row of grid) if ((row[c] ?? 0) === (row[0] ?? 0)) ones++;
		score += Math.max(ones, m - ones) * 2 ** (n - 1 - c);
	}
	return score;
};
