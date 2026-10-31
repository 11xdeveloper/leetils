/**
 * 2875. Minimum Size Subarray in Infinite Array
 *
 * `nums` repeats forever. Returns the length of the shortest subarray of
 * that infinite array summing to `target`, or -1.
 *
 * Whole copies contribute `⌊target / total⌋ · n`. The remainder must be
 * a subarray of two copies laid end to end, found with a sliding window
 * since every element is positive.
 *
 * @see https://leetcode.com/problems/minimum-size-subarray-in-infinite-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumSizeSubarrayInInfiniteArray([1, 1, 1, 2, 3], 4); // 2
 */
export const minimumSizeSubarrayInInfiniteArray = (
	nums: readonly number[],
	target: number,
): number => {
	const n = nums.length;
	const total = nums.reduce((sum, num) => sum + num, 0);
	const copies = Math.floor(target / total);
	const rest = target % total;
	if (rest === 0) return copies * n;

	let shortest = Number.POSITIVE_INFINITY;
	let sum = 0;
	let left = 0;
	for (let right = 0; right < 2 * n; right++) {
		sum += nums[right % n] ?? 0;
		while (sum > rest) sum -= nums[left++ % n] ?? 0;
		if (sum === rest) shortest = Math.min(shortest, right - left + 1);
	}
	return shortest === Number.POSITIVE_INFINITY ? -1 : copies * n + shortest;
};
