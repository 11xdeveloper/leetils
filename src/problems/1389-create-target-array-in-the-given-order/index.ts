/**
 * 1389. Create Target Array in the Given Order
 *
 * Starting from an empty array, inserts each `nums[i]` at position
 * `index[i]` in turn, and returns the result.
 *
 * Performs the insertions with `splice`; at most 100 elements makes the
 * quadratic cost irrelevant.
 *
 * @see https://leetcode.com/problems/create-target-array-in-the-given-order/
 * @difficulty Easy
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * createTargetArrayInTheGivenOrder([0, 1, 2, 3, 4], [0, 1, 2, 2, 1]); // [0, 4, 1, 3, 2]
 */
export const createTargetArrayInTheGivenOrder = (
	nums: readonly number[],
	index: readonly number[],
): number[] => {
	const target: number[] = [];
	nums.forEach((num, i) => {
		target.splice(index[i] ?? 0, 0, num);
	});
	return target;
};
