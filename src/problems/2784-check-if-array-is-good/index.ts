/**
 * 2784. Check if Array is Good
 *
 * An array is good if it's a permutation of `[1, 2, …, n - 1, n, n]` for
 * some `n`. Returns whether `nums` is good.
 *
 * Sort and compare against that sequence.
 *
 * @see https://leetcode.com/problems/check-if-array-is-good/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * checkIfArrayIsGood([1, 3, 3, 2]); // true
 */
export const checkIfArrayIsGood = (nums: readonly number[]): boolean => {
	const n = nums.length - 1;
	return nums
		.toSorted((a, b) => a - b)
		.every((num, i) => num === Math.min(i + 1, n));
};
