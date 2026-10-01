/**
 * 1863. Sum of All Subset XOR Totals
 *
 * Returns the sum of the XOR of every subset of `nums`.
 *
 * A bit set in any element is set in exactly half of the subset XORs, so
 * the total is the OR of all elements times `2^(n − 1)`.
 *
 * @see https://leetcode.com/problems/sum-of-all-subset-xor-totals/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * sumOfAllSubsetXorTotals([5, 1, 6]); // 28
 */
export const sumOfAllSubsetXorTotals = (nums: readonly number[]): number =>
	nums.reduce((or, num) => or | num, 0) * 2 ** (nums.length - 1);
