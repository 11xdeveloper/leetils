/**
 * 1802. Maximum Value at a Given Index in a Bounded Array
 *
 * Builds `n` positive integers summing to at most `maxSum` with
 * neighbours differing by at most 1. Returns the largest possible value
 * at `index`.
 *
 * Binary search the peak: the cheapest array with that peak falls by 1 on
 * each side down to a floor of 1, a sum of two arithmetic series.
 *
 * @see https://leetcode.com/problems/maximum-value-at-a-given-index-in-a-bounded-array/
 * @difficulty Medium
 * @timeComplexity O(log maxSum)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumValueAtAGivenIndexInABoundedArray(6, 1, 10); // 3
 */
export const maximumValueAtAGivenIndexInABoundedArray = (
	n: number,
	index: number,
	maxSum: number,
): number => {
	/** The least sum of `length` values descending from `peak − 1`, never below 1. */
	const side = (peak: number, length: number) => {
		if (peak > length) return (length * (2 * peak - 1 - length)) / 2;
		return ((peak - 1) * peak) / 2 + (length - (peak - 1));
	};
	let [low, high] = [1, maxSum];
	while (low < high) {
		const peak = Math.ceil((low + high) / 2);
		if (peak + side(peak, index) + side(peak, n - 1 - index) <= maxSum)
			low = peak;
		else high = peak - 1;
	}
	return low;
};
