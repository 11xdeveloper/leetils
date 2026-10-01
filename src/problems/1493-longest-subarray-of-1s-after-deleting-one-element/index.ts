/**
 * 1493. Longest Subarray of 1's After Deleting One Element
 *
 * Deleting exactly one element of the binary array `nums`, returns the
 * longest run of 1s possible.
 *
 * Slides a window holding at most one 0; the deleted element is that 0 (or
 * any element if there's none), so the answer is the widest window minus
 * one.
 *
 * @see https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * longestSubarrayOf1sAfterDeletingOneElement([0, 1, 1, 1, 0, 1, 1, 0, 1]); // 5
 */
export const longestSubarrayOf1sAfterDeletingOneElement = (
	nums: readonly number[],
): number => {
	let [start, zeros, widest] = [0, 0, 0];
	nums.forEach((num, end) => {
		if (num === 0) zeros++;
		while (zeros > 1) {
			if (nums[start] === 0) zeros--;
			start++;
		}
		widest = Math.max(widest, end - start + 1);
	});
	return widest - 1;
};
