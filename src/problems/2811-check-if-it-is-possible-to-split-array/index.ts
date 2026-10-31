/**
 * 2811. Check if it is Possible to Split Array
 *
 * An array splits step by step into single elements; each piece produced
 * must be one element long or sum to at least `m`. Returns whether the
 * whole split is possible.
 *
 * Arrays of up to two elements always split. Otherwise some adjacent pair
 * summing to at least `m` is needed and enough: peel elements off the
 * ends while that pair stays inside a big enough piece.
 *
 * @see https://leetcode.com/problems/check-if-it-is-possible-to-split-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfItIsPossibleToSplitArray([2, 3, 3, 2, 3], 6); // true
 */
export const checkIfItIsPossibleToSplitArray = (
	nums: readonly number[],
	m: number,
): boolean =>
	nums.length <= 2 ||
	nums.some((num, i) => i > 0 && (nums[i - 1] ?? 0) + num >= m);
