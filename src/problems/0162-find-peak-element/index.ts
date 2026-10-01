/**
 * 162. Find Peak Element
 *
 * Returns the index of any peak in `nums`: a value strictly greater than its
 * neighbours, where positions beyond either end count as -∞. Adjacent values
 * are never equal.
 *
 * Binary search: if the middle value is less than the one after it, the
 * values rise to the right and must peak somewhere there; otherwise a peak
 * is at the middle or to its left.
 *
 * @see https://leetcode.com/problems/find-peak-element/
 * @difficulty Medium
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * findPeakElement([1, 2, 3, 1]); // 2
 */
export const findPeakElement = (nums: readonly number[]): number => {
	let low = 0;
	let high = nums.length - 1;

	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		if ((nums[mid] ?? 0) < (nums[mid + 1] ?? 0)) low = mid + 1;
		else high = mid;
	}

	return low;
};
