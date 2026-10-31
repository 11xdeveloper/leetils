/**
 * 3432. Count Partitions with Even Sum Difference
 *
 * Count the ways to cut `nums` into a non-empty left and right part whose
 * sums differ by an even amount.
 *
 * The difference has the parity of the total sum, whatever the cut, so
 * either every one of the n - 1 cuts works or none does.
 *
 * @see https://leetcode.com/problems/count-partitions-with-even-sum-difference/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countPartitionsWithEvenSumDifference([10, 10, 3, 7, 6]); // 4
 */
export const countPartitionsWithEvenSumDifference = (
	nums: readonly number[],
): number => (nums.reduce((a, b) => a + b, 0) % 2 === 0 ? nums.length - 1 : 0);
