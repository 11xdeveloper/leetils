/**
 * 2574. Left and Right Sum Differences
 *
 * Returns, for each index, the absolute difference between the sum of
 * the elements before it and the sum of those after it.
 *
 * Track the left sum as you go; the right sum is the total minus it and
 * the element itself.
 *
 * @see https://leetcode.com/problems/left-and-right-sum-differences/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * leftAndRightSumDifferences([10, 4, 8, 3]); // [15, 1, 11, 22]
 */
export const leftAndRightSumDifferences = (
	nums: readonly number[],
): number[] => {
	const total = nums.reduce((sum, num) => sum + num, 0);
	let left = 0;
	return nums.map((num) => {
		const difference = Math.abs(left - (total - left - num));
		left += num;
		return difference;
	});
};
