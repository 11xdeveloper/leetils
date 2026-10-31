/**
 * 3702. Longest Subsequence With Non-Zero Bitwise XOR
 *
 * The length of the longest subsequence of `nums` whose XOR isn't 0.
 *
 * If the whole array's XOR is non-zero, take everything. Otherwise
 * dropping any one non-zero element works; if all are zero, nothing does.
 *
 * @see https://leetcode.com/problems/longest-subsequence-with-non-zero-bitwise-xor/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * longestSubsequenceWithNonZeroBitwiseXor([1, 2, 3]); // 2
 */
export const longestSubsequenceWithNonZeroBitwiseXor = (
	nums: readonly number[],
): number => {
	if (nums.reduce((a, b) => a ^ b, 0) !== 0) return nums.length;
	return nums.some((num) => num !== 0) ? nums.length - 1 : 0;
};
