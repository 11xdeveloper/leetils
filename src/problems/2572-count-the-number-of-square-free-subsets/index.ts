const MOD = 1_000_000_007;
const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

/**
 * 2572. Count the Number of Square-Free Subsets
 *
 * Returns the number of non-empty subsets of `nums`, whose values are
 * from 1 to 30, with a product divisible by no square greater than 1,
 * modulo 1e9 + 7.
 *
 * A square-free number's primes form a mask; a subset is square-free when
 * its numbers' masks are disjoint. Count subsets by combined mask, and
 * let each 1 double the count, since it never matters.
 *
 * @see https://leetcode.com/problems/count-the-number-of-square-free-subsets/
 * @difficulty Medium
 * @timeComplexity O(n · 2¹⁰)
 * @spaceComplexity O(2¹⁰)
 *
 * @example
 * countTheNumberOfSquareFreeSubsets([3, 4, 4, 5]); // 3
 */
export const countTheNumberOfSquareFreeSubsets = (
	nums: readonly number[],
): number => {
	const maskOf = (x: number): number => {
		let mask = 0;
		for (const [bit, p] of PRIMES.entries()) {
			if (x % (p * p) === 0) return -1;
			if (x % p === 0) mask |= 1 << bit;
		}
		return mask;
	};

	const ways = Array.from({ length: 1 << PRIMES.length }, () => 0);
	ways[0] = 1;
	for (const num of nums) {
		const mask = maskOf(num);
		if (mask < 0) continue;
		for (let used = ways.length - 1; used >= 0; used--)
			if ((used & mask) === 0)
				ways[used | mask] =
					((ways[used | mask] ?? 0) + (ways[used] ?? 0)) % MOD;
	}
	return (ways.reduce((sum, count) => (sum + count) % MOD, 0) - 1 + MOD) % MOD;
};
