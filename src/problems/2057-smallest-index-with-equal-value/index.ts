/**
 * 2057. Smallest Index With Equal Value
 *
 * Returns the smallest index `i` with `i mod 10 === nums[i]`, or -1.
 *
 * Scan the array.
 *
 * @see https://leetcode.com/problems/smallest-index-with-equal-value/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * smallestIndexWithEqualValue([4, 3, 2, 1]); // 2
 */
export const smallestIndexWithEqualValue = (nums: readonly number[]): number =>
	nums.findIndex((num, i) => i % 10 === num);
