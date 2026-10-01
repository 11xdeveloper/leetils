/**
 * 1846. Maximum Element After Decreasing and Rearranging
 *
 * Rearranging `arr` and decreasing elements, the first must be 1 and
 * neighbours may differ by at most 1. Returns the largest possible
 * maximum.
 *
 * Sorted, each element becomes at most one more than the previous.
 *
 * @see https://leetcode.com/problems/maximum-element-after-decreasing-and-rearranging/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumElementAfterDecreasingAndRearranging([100, 1, 1000]); // 3
 */
export const maximumElementAfterDecreasingAndRearranging = (
	arr: readonly number[],
): number => {
	let largest = 0;
	for (const value of arr.toSorted((a, b) => a - b))
		largest = Math.min(value, largest + 1);
	return largest;
};
