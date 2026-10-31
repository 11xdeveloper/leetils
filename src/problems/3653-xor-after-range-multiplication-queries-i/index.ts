const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

/**
 * 3653. XOR After Range Multiplication Queries I
 *
 * Each query `[l, r, k, v]` multiplies `nums[l]`, `nums[l + k]`, … up to
 * index r by v, modulo 1e9+7. Returns the XOR of the final array.
 *
 * Apply each query directly.
 *
 * @see https://leetcode.com/problems/xor-after-range-multiplication-queries-i/
 * @difficulty Medium
 * @timeComplexity O(n + q · n)
 * @spaceComplexity O(n)
 *
 * @example
 * xorAfterRangeMultiplicationQueriesI([2, 3, 1, 5, 4], [[1, 4, 2, 3], [0, 2, 1, 2]]); // 31
 */
export const xorAfterRangeMultiplicationQueriesI = (
	nums: readonly number[],
	queries: readonly (readonly number[])[],
): number => {
	const values = [...nums];
	for (const [l = 0, r = 0, k = 1, v = 1] of queries)
		for (let i = l; i <= r; i += k) values[i] = multiply(values[i] ?? 0, v);
	return values.reduce((a, b) => a ^ b, 0);
};
