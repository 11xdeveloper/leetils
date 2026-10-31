/**
 * 3701. Compute Alternating Sum
 *
 * Adds the elements at even indices and subtracts those at odd ones.
 *
 * @see https://leetcode.com/problems/compute-alternating-sum/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * computeAlternatingSum([1, 3, 5, 7]); // -4
 */
export const computeAlternatingSum = (nums: readonly number[]): number =>
	nums.reduce((sum, num, i) => (i % 2 === 0 ? sum + num : sum - num), 0);
