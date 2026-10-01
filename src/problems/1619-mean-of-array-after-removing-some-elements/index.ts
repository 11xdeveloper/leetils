/**
 * 1619. Mean of Array After Removing Some Elements
 *
 * Returns the mean of `arr` after dropping its smallest and largest 5%
 * (its length is a multiple of 20).
 *
 * Sorts and averages the middle 90%.
 *
 * @see https://leetcode.com/problems/mean-of-array-after-removing-some-elements/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * meanOfArrayAfterRemovingSomeElements([6, 2, 7, 5, 1, 2, 0, 3, 10, 2, 5, 0, 5, 5, 0, 8, 7, 6, 8, 0]); // 4
 */
export const meanOfArrayAfterRemovingSomeElements = (
	arr: readonly number[],
): number => {
	const cut = arr.length / 20;
	const kept = arr.toSorted((a, b) => a - b).slice(cut, arr.length - cut);
	return kept.reduce((sum, value) => sum + value, 0) / kept.length;
};
