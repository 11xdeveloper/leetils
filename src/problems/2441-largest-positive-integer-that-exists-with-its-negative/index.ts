/**
 * 2441. Largest Positive Integer That Exists With Its Negative
 *
 * Returns the largest `k > 0` with both `k` and `-k` in `nums`, or -1.
 *
 * @see https://leetcode.com/problems/largest-positive-integer-that-exists-with-its-negative/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * largestPositiveIntegerThatExistsWithItsNegative([-1, 10, 6, 7, -7, 1]); // 7
 */
export const largestPositiveIntegerThatExistsWithItsNegative = (
	nums: readonly number[],
): number => {
	const values = new Set(nums);
	return Math.max(-1, ...nums.filter((num) => num > 0 && values.has(-num)));
};
