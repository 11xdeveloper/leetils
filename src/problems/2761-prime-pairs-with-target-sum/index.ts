/**
 * 2761. Prime Pairs With Target Sum
 *
 * Returns every pair of primes `[x, y]` with `x <= y` and `x + y = n`,
 * sorted by `x`.
 *
 * Sieve up to `n` and check each `x` up to `n / 2`.
 *
 * @see https://leetcode.com/problems/prime-pairs-with-target-sum/
 * @difficulty Medium
 * @timeComplexity O(n log log n)
 * @spaceComplexity O(n)
 *
 * @example
 * primePairsWithTargetSum(10); // [[3, 7], [5, 5]]
 */
export const primePairsWithTargetSum = (n: number): number[][] => {
	const composite = new Uint8Array(n + 1);
	for (let p = 2; p * p <= n; p++)
		if (!composite[p]) for (let m = p * p; m <= n; m += p) composite[m] = 1;
	const pairs: number[][] = [];
	for (let x = 2; 2 * x <= n; x++)
		if (!composite[x] && !composite[n - x]) pairs.push([x, n - x]);
	return pairs;
};
