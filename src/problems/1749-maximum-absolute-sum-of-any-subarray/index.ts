/**
 * 1749. Maximum Absolute Sum of Any Subarray
 *
 * Returns the largest absolute value of a (possibly empty) subarray sum.
 *
 * Every subarray sum is a difference of two prefix sums, so the answer is
 * the largest prefix sum minus the smallest (both including the empty
 * prefix).
 *
 * @see https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumAbsoluteSumOfAnySubarray([2, -5, 1, -4, 3, -2]); // 8
 */
export const maximumAbsoluteSumOfAnySubarray = (
	nums: readonly number[],
): number => {
	let [prefix, highest, lowest] = [0, 0, 0];
	for (const num of nums) {
		prefix += num;
		highest = Math.max(highest, prefix);
		lowest = Math.min(lowest, prefix);
	}
	return highest - lowest;
};
