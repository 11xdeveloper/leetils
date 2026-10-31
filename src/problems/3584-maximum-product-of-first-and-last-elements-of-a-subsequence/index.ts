/**
 * 3584. Maximum Product of First and Last Elements of a Subsequence
 *
 * The largest product of the first and last elements of a subsequence of
 * `nums` with `m` elements.
 *
 * Any first index i and last index j with j - i ≥ m - 1 work. Sweep j,
 * keeping the largest and smallest values far enough behind it.
 *
 * @see https://leetcode.com/problems/maximum-product-of-first-and-last-elements-of-a-subsequence/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumProductOfFirstAndLastElementsOfASubsequence([-1, -9, 2, 3, -2, -3, 1], 1); // 81
 */
export const maximumProductOfFirstAndLastElementsOfASubsequence = (
	nums: readonly number[],
	m: number,
): number => {
	let high = Number.NEGATIVE_INFINITY;
	let low = Number.POSITIVE_INFINITY;
	let best = Number.NEGATIVE_INFINITY;
	for (let j = m - 1; j < nums.length; j++) {
		const first = nums[j - m + 1] ?? 0;
		high = Math.max(high, first);
		low = Math.min(low, first);
		const last = nums[j] ?? 0;
		best = Math.max(best, high * last, low * last);
	}
	return best;
};
