/**
 * 3736. Minimum Moves to Equal Array Elements III
 *
 * One move increments an element. Returns the fewest moves making all
 * elements equal: raise everything to the maximum.
 *
 * @see https://leetcode.com/problems/minimum-moves-to-equal-array-elements-iii/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumMovesToEqualArrayElementsIII([2, 1, 3]); // 3
 */
export const minimumMovesToEqualArrayElementsIII = (
	nums: readonly number[],
): number => {
	const most = Math.max(...nums);
	return nums.reduce((sum, num) => sum + most - num, 0);
};
