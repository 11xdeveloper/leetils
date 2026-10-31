/**
 * 3495. Minimum Operations to Make Array Elements Zero
 *
 * For each query `[l, r]`, start from the numbers l to r. An operation
 * picks two of them and divides both by 4, rounding down. Returns the sum
 * over the queries of the fewest operations to make everything 0.
 *
 * A number x needs ⌊log₄ x⌋ + 1 divisions. Each operation does two, so a
 * query needs half the total, rounded up (no single number dominates for
 * ranges of two or more). Count the numbers in the range needing each
 * number of divisions.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-array-elements-zero/
 * @difficulty Hard
 * @timeComplexity O(q log r)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumOperationsToMakeArrayElementsZero([[1, 2], [2, 4]]); // 3
 */
export const minimumOperationsToMakeArrayElementsZero = (
	queries: readonly (readonly number[])[],
): number => {
	let total = 0;
	for (const [l = 0, r = 0] of queries) {
		let divisions = 0;
		let largest = 0;
		for (let steps = 1, low = 1; low <= r; steps++, low *= 4) {
			const high = low * 4 - 1;
			const count = Math.max(0, Math.min(r, high) - Math.max(l, low) + 1);
			divisions += count * steps;
			if (count > 0) largest = steps;
		}
		total += Math.max(Math.ceil(divisions / 2), largest);
	}
	return total;
};
