/**
 * 1343. Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold
 *
 * Returns how many subarrays of length `k` have an average of at least
 * `threshold`.
 *
 * Slides a window of `k` elements, comparing its sum with `k · threshold`
 * to avoid division.
 *
 * @see https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfSubArraysOfSizeKAndAverageGreaterThanOrEqualToThreshold([2, 2, 2, 2, 5, 5, 5, 8], 3, 4); // 3
 */
export const numberOfSubArraysOfSizeKAndAverageGreaterThanOrEqualToThreshold = (
	arr: readonly number[],
	k: number,
	threshold: number,
): number => {
	let [sum, count] = [0, 0];
	arr.forEach((value, i) => {
		sum += value - (arr[i - k] ?? 0);
		if (i >= k - 1 && sum >= k * threshold) count++;
	});
	return count;
};
