/**
 * 1708. Largest Subarray Length K
 *
 * Returns the largest subarray of length `k` of `nums` (distinct
 * integers), comparing arrays at their first difference.
 *
 * With distinct values the comparison is settled by the first element, so
 * start at the largest element among those leaving room for `k`.
 *
 * @see https://leetcode.com/problems/largest-subarray-length-k/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(k)
 *
 * @example
 * largestSubarrayLengthK([1, 4, 5, 2, 3], 3); // [5, 2, 3]
 */
export const largestSubarrayLengthK = (
	nums: readonly number[],
	k: number,
): number[] => {
	let start = 0;
	for (let i = 1; i + k <= nums.length; i++)
		if ((nums[i] ?? 0) > (nums[start] ?? 0)) start = i;
	return nums.slice(start, start + k);
};
