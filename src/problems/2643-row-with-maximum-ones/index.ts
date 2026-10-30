/**
 * 2643. Row With Maximum Ones
 *
 * Returns `[row, count]` for the row of a binary matrix with the most
 * 1s, preferring the earliest.
 *
 * Count each row's 1s.
 *
 * @see https://leetcode.com/problems/row-with-maximum-ones/
 * @difficulty Easy
 * @timeComplexity O(m · n)
 * @spaceComplexity O(1)
 *
 * @example
 * rowWithMaximumOnes([[0, 0, 0], [0, 1, 1]]); // [1, 2]
 */
export const rowWithMaximumOnes = (
	mat: readonly (readonly number[])[],
): number[] => {
	let best = [0, -1];
	for (const [r, row] of mat.entries()) {
		const ones = row.reduce((sum, bit) => sum + bit, 0);
		if (ones > (best[1] ?? 0)) best = [r, ones];
	}
	return best;
};
