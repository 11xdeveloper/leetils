/**
 * 704. Binary Search
 *
 * Returns the index of `target` in the sorted array of distinct numbers
 * `nums`, or -1 if it's missing, in O(log n) time.
 *
 * Halves the range that could hold `target` each step.
 *
 * @see https://leetcode.com/problems/binary-search/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * binarySearch([-1, 0, 3, 5, 9, 12], 9); // 4
 */
export const binarySearch = (
	nums: readonly number[],
	target: number,
): number => {
	let low = 0;
	let high = nums.length - 1;
	while (low <= high) {
		const mid = (low + high) >>> 1;
		const value = nums[mid] ?? 0;
		if (value === target) return mid;
		if (value < target) low = mid + 1;
		else high = mid - 1;
	}
	return -1;
};
