/**
 * 2841. Maximum Sum of Almost Unique Subarray
 *
 * Returns the largest sum of a length-`k` subarray with at least `m`
 * distinct values, or 0 if there is none.
 *
 * Slide the window, keeping its sum and value counts.
 *
 * @see https://leetcode.com/problems/maximum-sum-of-almost-unique-subarray/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(k)
 *
 * @example
 * maximumSumOfAlmostUniqueSubarray([2, 6, 7, 3, 1, 7], 3, 4); // 18
 */
export const maximumSumOfAlmostUniqueSubarray = (
	nums: readonly number[],
	m: number,
	k: number,
): number => {
	const counts = new Map<number, number>();
	let sum = 0;
	let best = 0;
	for (const [i, num] of nums.entries()) {
		counts.set(num, (counts.get(num) ?? 0) + 1);
		sum += num;
		if (i >= k) {
			const dropped = nums[i - k] ?? 0;
			const left = (counts.get(dropped) ?? 0) - 1;
			if (left === 0) counts.delete(dropped);
			else counts.set(dropped, left);
			sum -= dropped;
		}
		if (i >= k - 1 && counts.size >= m) best = Math.max(best, sum);
	}
	return best;
};
