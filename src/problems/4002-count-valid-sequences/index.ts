const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

/**
 * 4002. Count Valid Sequences
 *
 * Counts sequences of `k` positive integers adding up to `n` whose product
 * is even, modulo 1e9+7.
 *
 * All C(n - 1, k - 1) compositions, minus those with every part odd: when
 * n and k share parity, writing parts as 2a + 1 leaves (n - k)/2 to share
 * among k non-negative a's.
 *
 * @see https://leetcode.com/problems/count-valid-sequences/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countValidSequences(5, 3); // 3
 */
export const countValidSequences = (n: number, k: number): number => {
	const factorial = [1];
	for (let i = 1; i <= n; i++)
		factorial.push(multiply(factorial[i - 1] ?? 1, i));
	const power = (base: number, exponent: number): number => {
		let result = 1;
		for (; exponent > 0; exponent = Math.floor(exponent / 2)) {
			if (exponent % 2 === 1) result = multiply(result, base);
			base = multiply(base, base);
		}
		return result;
	};
	const choose = (a: number, b: number): number =>
		b < 0 || b > a
			? 0
			: multiply(
					factorial[a] ?? 1,
					power(multiply(factorial[b] ?? 1, factorial[a - b] ?? 1), MOD - 2),
				);
	const all = choose(n - 1, k - 1);
	const odd = (n - k) % 2 === 0 ? choose((n - k) / 2 + k - 1, k - 1) : 0;
	return (all - odd + MOD) % MOD;
};
