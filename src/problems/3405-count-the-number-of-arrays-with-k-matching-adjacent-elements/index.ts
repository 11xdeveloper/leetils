const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

const power = (base: number, exponent: number): number => {
	let result = 1;
	let b = base % MOD;
	for (let e = exponent; e > 0; e = Math.floor(e / 2)) {
		if (e % 2 === 1) result = multiply(result, b);
		b = multiply(b, b);
	}
	return result;
};

/**
 * 3405. Count the Number of Arrays with K Matching Adjacent Elements
 *
 * Count arrays of length `n` with values from 1 to `m` where exactly `k`
 * neighbouring pairs are equal, modulo 10⁹ + 7.
 *
 * Choose which k of the n - 1 neighbouring pairs are equal, the first
 * value freely, and every other pair's second value as anything but the
 * first: C(n - 1, k) · m · (m - 1)^(n - 1 - k).
 *
 * @see https://leetcode.com/problems/count-the-number-of-arrays-with-k-matching-adjacent-elements/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countTheNumberOfArraysWithKMatchingAdjacentElements(3, 2, 1); // 4
 */
export const countTheNumberOfArraysWithKMatchingAdjacentElements = (
	n: number,
	m: number,
	k: number,
): number => {
	let numerator = 1;
	let denominator = 1;
	for (let i = 0; i < k; i++) {
		numerator = multiply(numerator, n - 1 - i);
		denominator = multiply(denominator, i + 1);
	}
	const choose = multiply(numerator, power(denominator, MOD - 2));
	return multiply(multiply(choose, m), power(m - 1, n - 1 - k));
};
