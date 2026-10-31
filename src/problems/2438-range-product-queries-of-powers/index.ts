/**
 * 2438. Range Product Queries of Powers
 *
 * `powers` lists, ascending, the powers of 2 summing to `n` (its set
 * bits). Returns, for each query `[left, right]`, the product of
 * `powers[left..right]` modulo 10^9 + 7.
 *
 * A product of powers of 2 is 2 to the sum of their exponents.
 *
 * @see https://leetcode.com/problems/range-product-queries-of-powers/
 * @difficulty Medium
 * @timeComplexity O(q · 30 + q log(30^2))
 * @spaceComplexity O(30)
 *
 * @example
 * rangeProductQueriesOfPowers(15, [[0, 1], [2, 2], [0, 3]]); // [2, 4, 64]
 */
export const rangeProductQueriesOfPowers = (
	n: number,
	queries: readonly (readonly number[])[],
): number[] => {
	const MOD = 1_000_000_007n;
	const exponents: number[] = [];
	for (let bit = 0; bit < 31; bit++) if (n & (1 << bit)) exponents.push(bit);
	const power = (exponent: number): number => {
		let [result, base, e] = [1n, 2n, BigInt(exponent)];
		while (e > 0n) {
			if (e & 1n) result = (result * base) % MOD;
			base = (base * base) % MOD;
			e >>= 1n;
		}
		return Number(result);
	};
	return queries.map(([left = 0, right = 0]) => {
		let sum = 0;
		for (let i = left; i <= right; i++) sum += exponents[i] ?? 0;
		return power(sum);
	});
};
