/**
 * 485. Max Consecutive Ones
 *
 * Returns the length of the longest run of 1s in the binary array `nums`.
 *
 * Counts the current run, resetting at each 0, and keeps the longest.
 *
 * @see https://leetcode.com/problems/max-consecutive-ones/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maxConsecutiveOnes([1, 1, 0, 1, 1, 1]); // 3
 */
export const maxConsecutiveOnes = (nums: readonly number[]): number => {
	let longest = 0;
	let run = 0;
	for (const num of nums) {
		run = num === 1 ? run + 1 : 0;
		longest = Math.max(longest, run);
	}
	return longest;
};
