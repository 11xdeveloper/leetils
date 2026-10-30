/**
 * 2958. Length of Longest Subarray With at Most K Frequency
 *
 * Returns the length of the longest subarray in which no value appears
 * more than `k` times.
 *
 * Slide a window, shrinking it whenever the newest value goes over.
 *
 * @see https://leetcode.com/problems/length-of-longest-subarray-with-at-most-k-frequency/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * lengthOfLongestSubarrayWithAtMostKFrequency([1, 2, 3, 1, 2, 3, 1, 2], 2); // 6
 */
export const lengthOfLongestSubarrayWithAtMostKFrequency = (
	nums: readonly number[],
	k: number,
): number => {
	const counts = new Map<number, number>();
	let left = 0;
	let best = 0;
	for (const [right, num] of nums.entries()) {
		counts.set(num, (counts.get(num) ?? 0) + 1);
		while ((counts.get(num) ?? 0) > k) {
			const dropped = nums[left++] ?? 0;
			counts.set(dropped, (counts.get(dropped) ?? 0) - 1);
		}
		best = Math.max(best, right - left + 1);
	}
	return best;
};
