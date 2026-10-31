/**
 * 3173. Bitwise OR of Adjacent Elements
 *
 * The bitwise OR of each pair of neighbours in `nums`.
 *
 * Map each element to its OR with the next.
 *
 * @see https://leetcode.com/problems/bitwise-or-of-adjacent-elements/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * bitwiseOrOfAdjacentElements([1, 3, 7, 15]); // [3, 7, 15]
 */
export const bitwiseOrOfAdjacentElements = (
	nums: readonly number[],
): number[] => nums.slice(1).map((num, i) => num | (nums[i] ?? 0));
