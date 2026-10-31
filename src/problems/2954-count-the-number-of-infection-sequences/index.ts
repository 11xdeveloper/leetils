const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

const power = (base: number, exponent: number): number => {
	let result = 1;
	for (; exponent > 0; exponent = Math.floor(exponent / 2)) {
		if (exponent % 2 === 1) result = multiply(result, base);
		base = multiply(base, base);
	}
	return result;
};

/**
 * 2954. Count the Number of Infection Sequences
 *
 * Children in a line at the `sick` positions are infected; each second
 * one healthy child next to an infected one catches it. Returns the
 * number of possible orders of infection, modulo 1e9 + 7.
 *
 * The healthy gaps interleave freely: a multinomial over gap sizes. A gap
 * between two infected children can also grow from either end, giving
 * `2^(len - 1)` orders within it; end gaps grow one way only.
 *
 * @see https://leetcode.com/problems/count-the-number-of-infection-sequences/
 * @difficulty Hard
 * @timeComplexity O(n + s log n)
 * @spaceComplexity O(n)
 *
 * @example
 * countTheNumberOfInfectionSequences(5, [0, 4]); // 4
 */
export const countTheNumberOfInfectionSequences = (
	n: number,
	sick: readonly number[],
): number => {
	const factorial = [1];
	for (let i = 1; i <= n; i++)
		factorial.push(multiply(factorial[i - 1] ?? 1, i));
	const healthy = n - sick.length;
	let ways = factorial[healthy] ?? 1;
	const gap = (length: number, inner: boolean): void => {
		if (length <= 0) return;
		ways = multiply(ways, power(factorial[length] ?? 1, MOD - 2));
		if (inner) ways = multiply(ways, power(2, length - 1));
	};
	gap(sick[0] ?? 0, false);
	for (let i = 1; i < sick.length; i++)
		gap((sick[i] ?? 0) - (sick[i - 1] ?? 0) - 1, true);
	gap(n - 1 - (sick.at(-1) ?? 0), false);
	return ways;
};
