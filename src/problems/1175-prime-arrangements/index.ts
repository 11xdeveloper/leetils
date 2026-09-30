/**
 * 1175. Prime Arrangements
 *
 * Returns the number of permutations of `1 … n` that put the primes at prime
 * positions (counting from 1), modulo 10^9 + 7.
 *
 * With `p` primes up to `n`, the primes can be arranged among the prime
 * positions in `p!` ways and the rest in `(n − p)!` ways. A sieve counts the
 * primes.
 *
 * @see https://leetcode.com/problems/prime-arrangements/
 * @difficulty Easy
 * @timeComplexity O(n log log n)
 * @spaceComplexity O(n)
 *
 * @example
 * primeArrangements(5); // 12
 */
export const primeArrangements = (n: number): number => {
	const MOD = 1_000_000_007;
	const composite = new Uint8Array(n + 1);
	let primes = 0;
	for (let i = 2; i <= n; i++) {
		if (composite[i]) continue;
		primes++;
		for (let j = i * i; j <= n; j += i) composite[j] = 1;
	}
	const factorial = (k: number) => {
		let result = 1;
		for (let i = 2; i <= k; i++) result = (result * i) % MOD;
		return result;
	};
	return Number(
		(BigInt(factorial(primes)) * BigInt(factorial(n - primes))) % BigInt(MOD),
	);
};
