/**
 * 1523. Count Odd Numbers in an Interval Range
 *
 * Counts the odd numbers from `low` to `high` inclusive.
 *
 * There are `⌊(x + 1) / 2⌋` odd numbers from 0 to `x`, so subtract the
 * count below `low`.
 *
 * @see https://leetcode.com/problems/count-odd-numbers-in-an-interval-range/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * countOddNumbersInAnIntervalRange(3, 7); // 3
 */
export const countOddNumbersInAnIntervalRange = (
	low: number,
	high: number,
): number => Math.floor((high + 1) / 2) - Math.floor(low / 2);
