const MOD = 1_000_000_007n;

/**
 * 1735. Count Ways to Make Array With Product
 *
 * For each query `[n, k]`, counts the arrays of `n` positive integers
 * whose product is `k`, modulo 10^9 + 7.
 *
 * Factor `k`. Each prime's exponent `e` is shared among the `n` positions
 * independently, in `C(e + n − 1, e)` ways (stars and bars), so multiply
 * those. Exponents are small (`k ≤ 10^4`), so each binomial is a short
 * exact product.
 *
 * @see https://leetcode.com/problems/count-ways-to-make-array-with-product/
 * @difficulty Hard
 * @timeComplexity O(q · √k)
 * @spaceComplexity O(1) beyond the output
 *
 * @example
 * countWaysToMakeArrayWithProduct([[2, 6], [5, 1], [73, 660]]); // [4, 1, 50734910]
 */
export const countWaysToMakeArrayWithProduct = (
	queries: readonly (readonly number[])[],
): number[] =>
	queries.map(([n = 1, k = 1]) => {
		const spread = (exponent: number) => {
			let binomial = 1n;
			for (let i = 1; i <= exponent; i++)
				binomial = (binomial * BigInt(n - 1 + i)) / BigInt(i);
			return binomial % MOD;
		};
		let ways = 1n;
		let rest = k;
		for (let prime = 2; prime * prime <= rest; prime++) {
			let exponent = 0;
			while (rest % prime === 0) {
				rest /= prime;
				exponent++;
			}
			ways = (ways * spread(exponent)) % MOD;
		}
		// Whatever is left is a single prime factor.
		if (rest > 1) ways = (ways * spread(1)) % MOD;
		return Number(ways);
	});
