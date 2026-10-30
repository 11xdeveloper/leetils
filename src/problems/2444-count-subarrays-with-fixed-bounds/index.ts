/**
 * 2444. Count Subarrays With Fixed Bounds
 *
 * Counts the subarrays whose minimum is `minK` and maximum is `maxK`.
 *
 * For each end, valid starts lie after the last out-of-range element and
 * no later than the last occurrences of both bounds.
 *
 * @see https://leetcode.com/problems/count-subarrays-with-fixed-bounds/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countSubarraysWithFixedBounds([1, 3, 5, 2, 7, 5], 1, 5); // 2
 */
export const countSubarraysWithFixedBounds = (
	nums: readonly number[],
	minK: number,
	maxK: number,
): number => {
	let [count, bad, lastMin, lastMax] = [0, -1, -1, -1];
	for (const [i, num] of nums.entries()) {
		if (num < minK || num > maxK) bad = i;
		if (num === minK) lastMin = i;
		if (num === maxK) lastMax = i;
		count += Math.max(0, Math.min(lastMin, lastMax) - bad);
	}
	return count;
};
