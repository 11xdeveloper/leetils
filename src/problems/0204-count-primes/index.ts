/**
 * 204. Count Primes
 *
 * Returns how many prime numbers are less than `n`.
 *
 * The sieve of Eratosthenes: crosses out the multiples of each prime,
 * starting from its square, since smaller multiples were already crossed out
 * by smaller primes. Whatever is left is prime.
 *
 * @see https://leetcode.com/problems/count-primes/
 * @difficulty Medium
 * @timeComplexity O(n log log n)
 * @spaceComplexity O(n)
 *
 * @example
 * countPrimes(10); // 4: 2, 3, 5 and 7
 */
export const countPrimes = (n: number): number => {
	if (n < 3) return 0;

	const composite = new Uint8Array(n);
	let count = 0;

	for (let i = 2; i < n; i++) {
		if (composite[i] === 1) continue;
		count++;
		for (let multiple = i * i; multiple < n; multiple += i)
			composite[multiple] = 1;
	}

	return count;
};
