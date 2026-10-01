/**
 * 371. Sum of Two Integers
 *
 * Adds two integers without using `+` or `-`.
 *
 * XOR adds the bits without carrying, and AND shifted left gives the carries.
 * Repeating with the carries until there are none gives the sum. JavaScript's
 * bitwise operators work on 32-bit two's complement integers, so negative
 * numbers work too, as they would in a fixed-width language.
 *
 * @see https://leetcode.com/problems/sum-of-two-integers/
 * @difficulty Medium
 * @timeComplexity O(1), at most 32 iterations
 * @spaceComplexity O(1)
 *
 * @example
 * sumOfTwoIntegers(2, 3); // 5
 */
export const sumOfTwoIntegers = (a: number, b: number): number => {
	let sum = a;
	let carry = b;

	while (carry !== 0) {
		const nextCarry = (sum & carry) << 1;
		sum ^= carry;
		carry = nextCarry;
	}

	return sum;
};
