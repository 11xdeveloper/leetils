const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

/**
 * 4039. Sum of Decoded Numbers
 *
 * Each element's last digit w splits the rest of its digits into x (the
 * first w) and y (the remainder). Returns the sum of x^y, modulo 1e9+7.
 *
 * @see https://leetcode.com/problems/sum-of-decoded-numbers/
 * @difficulty Medium
 * @timeComplexity O(n log y)
 * @spaceComplexity O(1)
 *
 * @example
 * sumOfDecodedNumbers([2522, 2101]); // 1649
 */
export const sumOfDecodedNumbers = (nums: readonly number[]): number => {
	let total = 0;
	for (const num of nums) {
		const width = num % 10;
		const digits = String(Math.floor(num / 10));
		let [base, exponent] = [
			Number(digits.slice(0, width)) % MOD,
			Number(digits.slice(width)),
		];
		let value = 1;
		for (; exponent > 0; exponent = Math.floor(exponent / 2)) {
			if (exponent % 2 === 1) value = multiply(value, base);
			base = multiply(base, base);
		}
		total = (total + value) % MOD;
	}
	return total;
};
