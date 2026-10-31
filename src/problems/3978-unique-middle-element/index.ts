/**
 * 3978. Unique Middle Element
 *
 * Whether the middle element of the odd-length `nums` appears only once.
 *
 * @see https://leetcode.com/problems/unique-middle-element/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * uniqueMiddleElement([1, 2, 3]); // true
 */
export const uniqueMiddleElement = (nums: readonly number[]): boolean => {
	const middle = nums[(nums.length - 1) / 2];
	return nums.filter((num) => num === middle).length === 1;
};
