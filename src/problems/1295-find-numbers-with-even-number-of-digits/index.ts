/**
 * 1295. Find Numbers with Even Number of Digits
 *
 * Returns how many of `nums` have an even number of digits.
 *
 * Counts each number's digits through its decimal string.
 *
 * @see https://leetcode.com/problems/find-numbers-with-even-number-of-digits/
 * @difficulty Easy
 * @timeComplexity O(n log max)
 * @spaceComplexity O(log max)
 *
 * @example
 * findNumbersWithEvenNumberOfDigits([12, 345, 2, 6, 7896]); // 2
 */
export const findNumbersWithEvenNumberOfDigits = (
	nums: readonly number[],
): number => nums.filter((num) => String(num).length % 2 === 0).length;
