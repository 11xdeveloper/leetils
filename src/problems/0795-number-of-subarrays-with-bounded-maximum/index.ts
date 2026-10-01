/**
 * 795. Number of Subarrays with Bounded Maximum
 *
 * Counts the non-empty subarrays of `nums` whose maximum is between `left`
 * and `right` inclusive.
 *
 * For each right end, a valid subarray starts after the last element above
 * `right` and at or before the last element in range, so the count is the
 * distance between those two positions.
 *
 * @see https://leetcode.com/problems/number-of-subarrays-with-bounded-maximum/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfSubarraysWithBoundedMaximum([2, 1, 4, 3], 2, 3); // 3
 */
export const numberOfSubarraysWithBoundedMaximum = (
	nums: readonly number[],
	left: number,
	right: number,
): number => {
	let count = 0;
	let lastTooBig = -1;
	let lastInRange = -1;
	for (const [i, num] of nums.entries()) {
		if (num > right) lastTooBig = i;
		if (num >= left && num <= right) lastInRange = i;
		count += Math.max(0, lastInRange - lastTooBig);
	}
	return count;
};
