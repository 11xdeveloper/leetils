/**
 * 896. Monotonic Array
 *
 * Returns whether `nums` never decreases or never increases.
 *
 * Checks both directions in one pass over neighbouring pairs.
 *
 * @see https://leetcode.com/problems/monotonic-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * monotonicArray([6, 5, 4, 4]); // true
 */
export const monotonicArray = (nums: readonly number[]): boolean => {
	let increasing = true;
	let decreasing = true;
	for (let i = 1; i < nums.length; i++) {
		if ((nums[i] ?? 0) < (nums[i - 1] ?? 0)) increasing = false;
		if ((nums[i] ?? 0) > (nums[i - 1] ?? 0)) decreasing = false;
	}
	return increasing || decreasing;
};
