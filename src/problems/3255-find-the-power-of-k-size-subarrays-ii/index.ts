/**
 * 3255. Find the Power of K-Size Subarrays II
 *
 * For every subarray of length `k`, its maximum if its elements are
 * consecutive and ascending, or -1 otherwise.
 *
 * Track the run of +1 steps ending at each index; a window qualifies when
 * that run covers it, and then its last element is the maximum.
 *
 * @see https://leetcode.com/problems/find-the-power-of-k-size-subarrays-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findThePowerOfKSizeSubarraysII([1, 2, 3, 4, 3, 2, 5], 3); // [3, 4, -1, -1, -1]
 */
export const findThePowerOfKSizeSubarraysII = (
	nums: readonly number[],
	k: number,
): number[] => {
	const result: number[] = [];
	let run = 0;
	nums.forEach((num, i) => {
		run = i > 0 && num === (nums[i - 1] ?? 0) + 1 ? run + 1 : 1;
		if (i >= k - 1) result.push(run >= k ? num : -1);
	});
	return result;
};
