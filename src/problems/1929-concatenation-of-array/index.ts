/**
 * 1929. Concatenation of Array
 *
 * Returns `nums` followed by itself.
 *
 * Spread it twice.
 *
 * @see https://leetcode.com/problems/concatenation-of-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * concatenationOfArray([1, 2, 1]); // [1, 2, 1, 1, 2, 1]
 */
export const concatenationOfArray = (nums: readonly number[]): number[] => [
	...nums,
	...nums,
];
