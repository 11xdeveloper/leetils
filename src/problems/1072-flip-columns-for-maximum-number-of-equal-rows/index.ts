/**
 * 1072. Flip Columns For Maximum Number of Equal Rows
 *
 * Flipping a column inverts every bit in it. Returns the most rows that can
 * be made all 0s or all 1s by flipping some set of columns.
 *
 * Two rows can be made uniform together exactly when they're equal or
 * complements. Normalising each row so it starts with 0 (inverting if
 * needed) groups them; the largest group is the answer.
 *
 * @see https://leetcode.com/problems/flip-columns-for-maximum-number-of-equal-rows/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * flipColumnsForMaximumNumberOfEqualRows([[0, 1], [1, 0]]); // 2
 */
export const flipColumnsForMaximumNumberOfEqualRows = (
	matrix: readonly (readonly number[])[],
): number => {
	const counts = new Map<string, number>();
	let best = 0;
	for (const row of matrix) {
		const key = row.map((bit) => bit ^ (row[0] ?? 0)).join("");
		const count = (counts.get(key) ?? 0) + 1;
		counts.set(key, count);
		best = Math.max(best, count);
	}
	return best;
};
