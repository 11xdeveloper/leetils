/**
 * 2148. Count Elements With Strictly Smaller and Greater Elements
 *
 * Counts the elements with both a strictly smaller and a strictly greater
 * element in `nums`.
 *
 * Those are the elements other than the minimum and maximum.
 *
 * @see https://leetcode.com/problems/count-elements-with-strictly-smaller-and-greater-elements/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countElementsWithStrictlySmallerAndGreaterElements([11, 7, 2, 15]); // 2
 */
export const countElementsWithStrictlySmallerAndGreaterElements = (
	nums: readonly number[],
): number => {
	const [low, high] = [Math.min(...nums), Math.max(...nums)];
	return nums.filter((num) => num > low && num < high).length;
};
