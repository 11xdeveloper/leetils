/**
 * 2478. Number of Beautiful Partitions
 *
 * Splits the digit string `s` into `k` parts of at least `minLength`, each
 * starting with a prime digit (2, 3, 5, 7) and ending with a non-prime.
 * Counts the ways, modulo 10^9 + 7.
 *
 * `ways[j][i]` counts splits of the first `i` digits into `j` parts. A
 * part may start at `l` only where a non-prime is followed by a prime;
 * running sums over those starts make each layer linear.
 *
 * @see https://leetcode.com/problems/number-of-beautiful-partitions/
 * @difficulty Hard
 * @timeComplexity O(k · n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfBeautifulPartitions("23542185131", 3, 2); // 3
 */
export const numberOfBeautifulPartitions = (
	s: string,
	k: number,
	minLength: number,
): number => {
	const MOD = 1_000_000_007;
	const n = s.length;
	const isPrime = (i: number): boolean => "2357".includes(s[i] ?? "");
	if (!isPrime(0) || isPrime(n - 1)) return 0;
	const canStart = (l: number): boolean =>
		l === 0 || (isPrime(l) && !isPrime(l - 1));

	let ways = new Array<number>(n + 1).fill(0);
	ways[0] = 1;
	for (let part = 1; part <= k; part++) {
		const next = new Array<number>(n + 1).fill(0);
		let available = 0;
		for (let end = 1; end <= n; end++) {
			// Starts at most end - minLength become usable as end grows.
			const start = end - minLength;
			if (start >= 0 && canStart(start))
				available = (available + (ways[start] ?? 0)) % MOD;
			if (!isPrime(end - 1) && (end === n || isPrime(end)))
				next[end] = available;
		}
		ways = next;
	}
	return ways[n] ?? 0;
};
