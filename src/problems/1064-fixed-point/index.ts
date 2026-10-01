/**
 * 1064. Fixed Point
 *
 * `arr` is sorted with distinct integers. Returns the smallest index `i`
 * with `arr[i] === i`, or -1 if there's none.
 *
 * `arr[i] - i` never decreases (values rise by at least 1 per index), so
 * binary search finds the first index where it reaches 0.
 *
 * @see https://leetcode.com/problems/fixed-point/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * fixedPoint([-10, -5, 0, 3, 7]); // 3
 */
export const fixedPoint = (arr: readonly number[]): number => {
	let low = 0;
	let high = arr.length - 1;
	let found = -1;
	while (low <= high) {
		const mid = (low + high) >>> 1;
		const difference = (arr[mid] ?? 0) - mid;
		if (difference >= 0) {
			if (difference === 0) found = mid;
			high = mid - 1;
		} else {
			low = mid + 1;
		}
	}
	return found;
};
