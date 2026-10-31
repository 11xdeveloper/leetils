/**
 * 3925. Concatenate Array With Reverse
 *
 * Returns `nums` followed by `nums` reversed.
 *
 * @see https://leetcode.com/problems/concatenate-array-with-reverse/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * concatenateArrayWithReverse([1, 2, 3]); // [1, 2, 3, 3, 2, 1]
 */
export const concatenateArrayWithReverse = (
	nums: readonly number[],
): number[] => [...nums, ...[...nums].reverse()];
