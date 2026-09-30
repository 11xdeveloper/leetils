/**
 * 852. Peak Index in a Mountain Array
 *
 * `arr` strictly rises then strictly falls. Returns the index of its peak
 * in O(log n) time.
 *
 * Binary search: if an element is smaller than the next, the peak is to its
 * right; otherwise it's at or to its left.
 *
 * @see https://leetcode.com/problems/peak-index-in-a-mountain-array/
 * @difficulty Medium
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * peakIndexInAMountainArray([0, 10, 5, 2]); // 1
 */
export const peakIndexInAMountainArray = (arr: readonly number[]): number => {
	let low = 0;
	let high = arr.length - 1;
	while (low < high) {
		const mid = (low + high) >>> 1;
		if ((arr[mid] ?? 0) < (arr[mid + 1] ?? 0)) low = mid + 1;
		else high = mid;
	}
	return low;
};
