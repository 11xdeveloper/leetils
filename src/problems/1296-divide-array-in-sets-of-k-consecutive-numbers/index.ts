import { handOfStraights } from "../0846-hand-of-straights";

/**
 * 1296. Divide Array in Sets of K Consecutive Numbers
 *
 * Returns whether `nums` can be split into groups of `k` consecutive
 * numbers.
 *
 * The same problem as Hand of Straights, with `k` as the group size.
 *
 * @see https://leetcode.com/problems/divide-array-in-sets-of-k-consecutive-numbers/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * divideArrayInSetsOfKConsecutiveNumbers([1, 2, 3, 3, 4, 4, 5, 6], 4); // true
 */
export const divideArrayInSetsOfKConsecutiveNumbers = (
	nums: readonly number[],
	k: number,
): boolean => handOfStraights(nums, k);
