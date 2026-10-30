/**
 * 2367. Number of Arithmetic Triplets
 *
 * Counts the triplets in the strictly increasing `nums` whose consecutive
 * gaps are both `diff`.
 *
 * Look up each value's successors in a set.
 *
 * @see https://leetcode.com/problems/number-of-arithmetic-triplets/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfArithmeticTriplets([0, 1, 4, 6, 7, 10], 3); // 2
 */
export const numberOfArithmeticTriplets = (
	nums: readonly number[],
	diff: number,
): number => {
	const values = new Set(nums);
	return nums.filter(
		(num) => values.has(num + diff) && values.has(num + 2 * diff),
	).length;
};
