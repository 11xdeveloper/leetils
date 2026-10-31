/**
 * 3353. Minimum Total Operations
 *
 * Each operation adds any integer to a prefix of `nums`. Returns the fewest
 * operations to make every element equal.
 *
 * Each place where neighbours differ needs its own prefix operation ending
 * there, and that's enough.
 *
 * @see https://leetcode.com/problems/minimum-total-operations/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumTotalOperations([1, 4, 2]); // 2
 */
export const minimumTotalOperations = (nums: readonly number[]): number => {
	let operations = 0;
	for (let i = 1; i < nums.length; i++)
		if (nums[i] !== nums[i - 1]) operations++;
	return operations;
};
