/**
 * 2829. Determine the Minimum Sum of a k-avoiding Array
 *
 * A k-avoiding array has distinct positive integers, no two summing to
 * `k`. Returns the smallest sum of one with `n` elements.
 *
 * Of each pair `x` and `k - x`, take the smaller: that's `1..⌊k/2⌋`. Any
 * more come from `k` upwards, which can't pair with anything.
 *
 * @see https://leetcode.com/problems/determine-the-minimum-sum-of-a-k-avoiding-array/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * determineTheMinimumSumOfAKAvoidingArray(5, 4); // 18
 */
export const determineTheMinimumSumOfAKAvoidingArray = (
	n: number,
	k: number,
): number => {
	const low = Math.min(n, Math.floor(k / 2));
	const high = n - low;
	return (low * (low + 1)) / 2 + high * k + (high * (high - 1)) / 2;
};
