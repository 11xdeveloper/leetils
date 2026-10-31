const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

const power = (base: number, exponent: number): number => {
	let result = 1;
	for (base %= MOD; exponent > 0; exponent = Math.floor(exponent / 2)) {
		if (exponent % 2 === 1) result = multiply(result, base);
		base = multiply(base, base);
	}
	return result;
};

/**
 * 3855. Sum of K-Digit Numbers in a Range
 *
 * Adds up every `k`-digit string of digits from `l` to `r` (leading zeros
 * allowed), read as a number, modulo 1e9+7.
 *
 * With c = r - l + 1 digit choices, every place holds each digit c^(k-1)
 * times, so the total is (sum of the digits) · c^(k-1) · 11…1 (k ones),
 * that repunit being (10^k - 1) / 9.
 *
 * @see https://leetcode.com/problems/sum-of-k-digit-numbers-in-a-range/
 * @difficulty Hard
 * @timeComplexity O(log k)
 * @spaceComplexity O(1)
 *
 * @example
 * sumOfKDigitNumbersInARange(1, 2, 2); // 66
 */
export const sumOfKDigitNumbersInARange = (
	l: number,
	r: number,
	k: number,
): number => {
	const choices = r - l + 1;
	const digitSum = ((l + r) * choices) / 2;
	const repunit = multiply((power(10, k) - 1 + MOD) % MOD, power(9, MOD - 2));
	return multiply(multiply(digitSum, power(choices, k - 1)), repunit);
};
