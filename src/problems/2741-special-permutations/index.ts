const MOD = 1_000_000_007;

/**
 * 2741. Special Permutations
 *
 * A permutation of `nums`, whose values are distinct, is special if each
 * neighbouring pair has one dividing the other. Returns the number of
 * special permutations, modulo 1e9 + 7.
 *
 * Bitmask DP over the set of elements placed and the last one placed.
 *
 * @see https://leetcode.com/problems/special-permutations/
 * @difficulty Medium
 * @timeComplexity O(2ⁿ · n²)
 * @spaceComplexity O(2ⁿ · n)
 *
 * @example
 * specialPermutations([2, 3, 6]); // 2
 */
export const specialPermutations = (nums: readonly number[]): number => {
	const n = nums.length;
	const fits = nums.map((a) => nums.map((b) => a % b === 0 || b % a === 0));
	const ways = Array.from({ length: 1 << n }, () =>
		Array.from({ length: n }, () => 0),
	);
	for (let i = 0; i < n; i++) (ways[1 << i] ?? [])[i] = 1;
	for (let mask = 1; mask < 1 << n; mask++)
		for (let last = 0; last < n; last++) {
			const count = ways[mask]?.[last] ?? 0;
			if (count === 0) continue;
			for (let next = 0; next < n; next++) {
				if ((mask >> next) & 1 || !fits[last]?.[next]) continue;
				const row = ways[mask | (1 << next)] ?? [];
				row[next] = ((row[next] ?? 0) + count) % MOD;
			}
		}
	return (ways[(1 << n) - 1] ?? []).reduce(
		(sum, count) => (sum + count) % MOD,
		0,
	);
};
