/**
 * 2760. Longest Even Odd Subarray With Threshold
 *
 * Returns the length of the longest subarray that starts with an even
 * number, alternates parity, and has every element at most `threshold`.
 *
 * Extend a run while it stays valid, restarting at each even number
 * within the threshold.
 *
 * @see https://leetcode.com/problems/longest-even-odd-subarray-with-threshold/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * longestEvenOddSubarrayWithThreshold([3, 2, 5, 4], 5); // 3
 */
export const longestEvenOddSubarrayWithThreshold = (
	nums: readonly number[],
	threshold: number,
): number => {
	let best = 0;
	let run = 0;
	for (const [i, num] of nums.entries()) {
		if (num > threshold) run = 0;
		else if (run > 0 && num % 2 !== (nums[i - 1] ?? 0) % 2) run++;
		else run = num % 2 === 0 ? 1 : 0;
		best = Math.max(best, run);
	}
	return best;
};
