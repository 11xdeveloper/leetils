/**
 * 400. Nth Digit
 *
 * Returns the `n`th digit (counting from 1) of the infinite sequence
 * 123456789101112….
 *
 * Skips whole groups of numbers with the same number of digits: 9 one-digit
 * numbers, 90 two-digit numbers, 900 three-digit numbers, and so on. Within
 * the right group, the position gives the number and which of its digits.
 *
 * @see https://leetcode.com/problems/nth-digit/
 * @difficulty Medium
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * nthDigit(11); // 0, the second digit of 10
 */
export const nthDigit = (n: number): number => {
	let remaining = n;
	let digits = 1;
	let count = 9;
	let first = 1;

	while (remaining > digits * count) {
		remaining -= digits * count;
		digits++;
		count *= 10;
		first *= 10;
	}

	const number = first + Math.floor((remaining - 1) / digits);
	return Number(String(number)[(remaining - 1) % digits]);
};
