/**
 * 2962. Count Subarrays Where Max Element Appears at Least K Times
 *
 * Returns how many subarrays contain the array's maximum at least `k`
 * times.
 *
 * Note the maximum's positions. A subarray ending at `r` qualifies when
 * it starts at or before the `k`-th most recent of them.
 *
 * @see https://leetcode.com/problems/count-subarrays-where-max-element-appears-at-least-k-times/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countSubarraysWhereMaxElementAppearsAtLeastKTimes([1, 3, 2, 3, 3], 2); // 6
 */
export const countSubarraysWhereMaxElementAppearsAtLeastKTimes = (
	nums: readonly number[],
	k: number,
): number => {
	const largest = Math.max(...nums);
	const positions: number[] = [];
	let count = 0;
	for (const [r, num] of nums.entries()) {
		if (num === largest) positions.push(r);
		if (positions.length >= k)
			count += (positions[positions.length - k] ?? 0) + 1;
	}
	return count;
};
