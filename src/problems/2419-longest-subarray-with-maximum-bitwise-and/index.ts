/**
 * 2419. Longest Subarray With Maximum Bitwise AND
 *
 * Returns the length of the longest subarray whose AND is the largest
 * possible.
 *
 * AND never exceeds its parts, so the largest is the maximum element; take
 * its longest run.
 *
 * @see https://leetcode.com/problems/longest-subarray-with-maximum-bitwise-and/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * longestSubarrayWithMaximumBitwiseAnd([1, 2, 3, 3, 2, 2]); // 2
 */
export const longestSubarrayWithMaximumBitwiseAnd = (
	nums: readonly number[],
): number => {
	const largest = Math.max(...nums);
	let [best, run] = [0, 0];
	for (const num of nums) {
		run = num === largest ? run + 1 : 0;
		best = Math.max(best, run);
	}
	return best;
};
