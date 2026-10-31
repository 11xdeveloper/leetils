/**
 * 3908. Valid Digit Number
 *
 * Whether `n` contains the digit `x` but doesn't start with it.
 *
 * @see https://leetcode.com/problems/valid-digit-number/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(log n)
 *
 * @example
 * validDigitNumber(101, 0); // true
 */
export const validDigitNumber = (n: number, x: number): boolean => {
	const digits = String(n);
	return digits.includes(String(x)) && digits[0] !== String(x);
};
