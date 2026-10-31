/**
 * 3641. Longest Semi-Repeating Subarray
 *
 * Returns the length of the longest subarray in which at most `k` distinct
 * values appear more than once.
 *
 * Sliding window, counting how many values in it are repeated.
 *
 * @see https://leetcode.com/problems/longest-semi-repeating-subarray/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestSemiRepeatingSubarray([1, 2, 3, 1, 2, 3, 4], 2); // 6
 */
export const longestSemiRepeatingSubarray = (
	nums: readonly number[],
	k: number,
): number => {
	const counts = new Map<number, number>();
	let repeated = 0;
	let start = 0;
	let best = 0;
	nums.forEach((num, end) => {
		const count = (counts.get(num) ?? 0) + 1;
		counts.set(num, count);
		if (count === 2) repeated++;
		while (repeated > k) {
			const left = nums[start++] ?? 0;
			const remaining = (counts.get(left) ?? 0) - 1;
			counts.set(left, remaining);
			if (remaining === 1) repeated--;
		}
		best = Math.max(best, end - start + 1);
	});
	return best;
};
