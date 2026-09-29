const INT_MAX = 2 ** 31 - 1;
const INT_MIN = -(2 ** 31);

/**
 * 29. Divide Two Integers
 *
 * Divides two 32-bit signed integers without using multiplication, division
 * or the remainder operator, truncating towards zero. Returns 2^31 - 1 if the
 * result overflows.
 *
 * Long division in binary: repeatedly subtracts the largest doubling of the
 * divisor that fits in what's left of the dividend, adding the matching
 * power of two to the quotient.
 *
 * @see https://leetcode.com/problems/divide-two-integers/
 * @difficulty Medium
 * @timeComplexity O(log^2 n)
 * @spaceComplexity O(1)
 *
 * @example
 * divideTwoIntegers(10, 3); // 3
 * divideTwoIntegers(7, -3); // -2
 */
export const divideTwoIntegers = (
	dividend: number,
	divisor: number,
): number => {
	// The only quotient that doesn't fit in 32 bits: 2^31.
	if (dividend === INT_MIN && divisor === -1) return INT_MAX;

	const negative = dividend < 0 !== divisor < 0;
	const absDivisor = Math.abs(divisor);
	let remaining = Math.abs(dividend);
	let quotient = 0;

	while (remaining >= absDivisor) {
		let chunk = absDivisor;
		let multiple = 1;
		while (chunk + chunk <= remaining) {
			chunk += chunk;
			multiple += multiple;
		}
		remaining -= chunk;
		quotient += multiple;
	}

	// `0 - quotient` rather than `-quotient`, which would be -0 for a zero quotient.
	return negative ? 0 - quotient : quotient;
};
