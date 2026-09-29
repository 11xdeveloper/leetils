/**
 * 667. Beautiful Arrangement II
 *
 * Returns a permutation of 1 to `n` whose neighbouring differences take
 * exactly `k` distinct values (`1 ≤ k < n`).
 *
 * Alternating between the ends of 1 to `k + 1` (1, k + 1, 2, k, …) gives
 * differences k, k - 1, …, 1. Continuing in order from `k + 2` only adds
 * differences of 1.
 *
 * @see https://leetcode.com/problems/beautiful-arrangement-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1) excluding the returned array
 *
 * @example
 * beautifulArrangementII(3, 2); // [1, 3, 2]
 */
export const beautifulArrangementII = (n: number, k: number): number[] => {
	const result: number[] = [];
	for (let low = 1, high = k + 1; low <= high; low++, high--) {
		result.push(low);
		if (low !== high) result.push(high);
	}
	for (let next = k + 2; next <= n; next++) result.push(next);
	return result;
};
