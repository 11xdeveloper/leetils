/**
 * 50. Pow(x, n)
 *
 * Returns `x` raised to the integer power `n`, which may be negative.
 *
 * Exponentiation by squaring: writes `n` in binary and multiplies together
 * the powers `x^1, x^2, x^4, ...` for its set bits. A negative `n` uses `1/x`
 * as the base.
 *
 * @see https://leetcode.com/problems/powx-n/
 * @difficulty Medium
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * powxN(2, 10); // 1024
 * powxN(2, -2); // 0.25
 */
export const powxN = (x: number, n: number): number => {
	let base = n < 0 ? 1 / x : x;
	let exponent = Math.abs(n);
	let result = 1;

	while (exponent > 0) {
		if (exponent % 2 === 1) result *= base;
		base *= base;
		exponent = Math.floor(exponent / 2);
	}

	return result;
};
