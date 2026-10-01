const MOD = 1337;

const powMod = (base: number, exponent: number): number => {
	let result = 1;
	for (let i = 0; i < exponent; i++) result = (result * base) % MOD;
	return result;
};

/**
 * 372. Super Pow
 *
 * Returns `a^b mod 1337`, where `b` is a huge positive integer given as an
 * array of its digits, most significant first.
 *
 * Reads `b` one digit at a time: if the result so far is `a^x`, appending
 * the digit `d` makes it `a^(10x + d) = (a^x)^10 · a^d`, all taken mod 1337
 * so the numbers stay small.
 *
 * @see https://leetcode.com/problems/super-pow/
 * @difficulty Medium
 * @timeComplexity O(n) where n is the number of digits in b
 * @spaceComplexity O(1)
 *
 * @example
 * superPow(2, [1, 0]); // 1024
 */
export const superPow = (a: number, b: readonly number[]): number => {
	const base = a % MOD;
	let result = 1;
	for (const digit of b)
		result = (powMod(result, 10) * powMod(base, digit)) % MOD;
	return result;
};
