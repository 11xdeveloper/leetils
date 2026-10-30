/**
 * 2442. Count Number of Distinct Integers After Reverse Operations
 *
 * Appends the digit reversal of every number to `nums`. Returns how many
 * distinct numbers result.
 *
 * @see https://leetcode.com/problems/count-number-of-distinct-integers-after-reverse-operations/
 * @difficulty Medium
 * @timeComplexity O(n log max)
 * @spaceComplexity O(n)
 *
 * @example
 * countNumberOfDistinctIntegersAfterReverseOperations([1, 13, 10, 12, 31]); // 6
 */
export const countNumberOfDistinctIntegersAfterReverseOperations = (
	nums: readonly number[],
): number =>
	new Set([
		...nums,
		...nums.map((num) => Number([...String(num)].reverse().join(""))),
	]).size;
