/**
 * 658. Find K Closest Elements
 *
 * Returns the `k` elements of the sorted array `arr` closest to `x`, in
 * ascending order. Of two equally close elements, the smaller is closer.
 *
 * The answer is a window of `k` consecutive elements. Binary search for its
 * start: comparing the window starting at `mid` with the one starting at
 * `mid + 1`, which differ only in `arr[mid]` and `arr[mid + k]`, says which
 * way the best start lies.
 *
 * @see https://leetcode.com/problems/find-k-closest-elements/
 * @difficulty Medium
 * @timeComplexity O(log(n - k) + k)
 * @spaceComplexity O(1) excluding the returned array
 *
 * @example
 * findKClosestElements([1, 2, 3, 4, 5], 4, 3); // [1, 2, 3, 4]
 */
export const findKClosestElements = (
	arr: readonly number[],
	k: number,
	x: number,
): number[] => {
	let low = 0;
	let high = arr.length - k;
	while (low < high) {
		const mid = (low + high) >>> 1;
		if (x - (arr[mid] ?? 0) > (arr[mid + k] ?? 0) - x) low = mid + 1;
		else high = mid;
	}
	return arr.slice(low, low + k);
};
