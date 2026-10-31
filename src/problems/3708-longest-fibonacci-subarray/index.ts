/**
 * 3708. Longest Fibonacci Subarray
 *
 * The length of the longest subarray in which every element from the
 * third on is the sum of the two before it.
 *
 * @see https://leetcode.com/problems/longest-fibonacci-subarray/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * longestFibonacciSubarray([1, 1, 1, 1, 2, 3, 5, 1]); // 5
 */
export const longestFibonacciSubarray = (nums: readonly number[]): number => {
	let best = Math.min(2, nums.length);
	let run = best;
	for (let i = 2; i < nums.length; i++) {
		run = nums[i] === (nums[i - 1] ?? 0) + (nums[i - 2] ?? 0) ? run + 1 : 2;
		best = Math.max(best, run);
	}
	return best;
};
