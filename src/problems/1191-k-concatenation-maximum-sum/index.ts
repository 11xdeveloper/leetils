/**
 * 1191. K-Concatenation Maximum Sum
 *
 * Returns the largest sum of a (possibly empty) subarray of `arr` repeated
 * `k` times, modulo 10^9 + 7.
 *
 * The best subarray either lies within two copies, found by Kadane's
 * algorithm over two copies, or, when the whole array sums to more than 0,
 * also spans the `k − 2` copies in between: the best suffix and prefix
 * (which Kadane's over two copies already joins) plus `k − 2` totals.
 *
 * @see https://leetcode.com/problems/k-concatenation-maximum-sum/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * kConcatenationMaximumSum([1, -2, 1], 5); // 2
 */
export const kConcatenationMaximumSum = (
	arr: readonly number[],
	k: number,
): number => {
	const total = arr.reduce((sum, value) => sum + value, 0);
	let [ending, best] = [0, 0];
	for (let copy = 0; copy < Math.min(k, 2); copy++) {
		for (const value of arr) {
			ending = Math.max(ending + value, 0);
			best = Math.max(best, ending);
		}
	}
	if (k > 2 && total > 0) best += (k - 2) * total;
	return best % 1_000_000_007;
};
