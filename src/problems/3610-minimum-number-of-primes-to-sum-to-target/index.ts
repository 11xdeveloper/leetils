/**
 * 3610. Minimum Number of Primes to Sum to Target
 *
 * The fewest of the first `m` primes, each usable any number of times,
 * that add up to `n`, or -1.
 *
 * Unbounded coin change over those primes.
 *
 * @see https://leetcode.com/problems/minimum-number-of-primes-to-sum-to-target/
 * @difficulty Medium
 * @timeComplexity O(n · m + m log m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * minimumNumberOfPrimesToSumToTarget(10, 2); // 4
 */
export const minimumNumberOfPrimesToSumToTarget = (
	n: number,
	m: number,
): number => {
	const primes: number[] = [];
	for (let x = 2; primes.length < m; x++)
		if (primes.every((p) => p * p > x || x % p !== 0)) primes.push(x);
	const fewest = new Array<number>(n + 1).fill(Number.POSITIVE_INFINITY);
	fewest[0] = 0;
	for (const p of primes)
		for (let total = p; total <= n; total++)
			fewest[total] = Math.min(
				fewest[total] ?? 0,
				(fewest[total - p] ?? 0) + 1,
			);
	const result = fewest[n] ?? Number.POSITIVE_INFINITY;
	return result === Number.POSITIVE_INFINITY ? -1 : result;
};
