/**
 * 2401. Longest Nice Subarray
 *
 * A subarray is nice when every pair of its elements has a bitwise AND of
 * 0. Returns the length of the longest.
 *
 * Elements of a nice window use disjoint bits, so their OR records the
 * bits in use; shrink the window until a new element fits.
 *
 * @see https://leetcode.com/problems/longest-nice-subarray/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * longestNiceSubarray([1, 3, 8, 48, 10]); // 3
 */
export const longestNiceSubarray = (nums: readonly number[]): number => {
	let [used, start, best] = [0, 0, 0];
	for (const [end, num] of nums.entries()) {
		while (used & num) used ^= nums[start++] ?? 0;
		used |= num;
		best = Math.max(best, end - start + 1);
	}
	return best;
};
