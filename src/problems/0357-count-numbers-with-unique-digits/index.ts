/**
 * 357. Count Numbers with Unique Digits
 *
 * Returns how many integers `x` with `0 <= x < 10^n` have no repeated
 * digits.
 *
 * Counts by length: a k-digit number with distinct digits has 9 choices for
 * its first digit (not 0) and 9, 8, 7, … for the rest. Adding the counts
 * for each length up to `n`, plus 1 for zero, gives the answer.
 *
 * @see https://leetcode.com/problems/count-numbers-with-unique-digits/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countNumbersWithUniqueDigits(2); // 91: all of 0–99 except 11, 22, …, 99
 */
export const countNumbersWithUniqueDigits = (n: number): number => {
	let total = 1;
	let withLength = 9;

	for (let length = 1; length <= n; length++) {
		total += withLength;
		withLength *= 10 - length;
	}

	return total;
};
