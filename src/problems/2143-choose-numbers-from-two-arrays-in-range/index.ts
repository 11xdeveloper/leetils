/**
 * 2143. Choose Numbers From Two Arrays in Range
 *
 * A range `[l, r]` with a choice of `nums1[i]` or `nums2[i]` at each
 * index is balanced when the chosen `nums1` values and chosen `nums2`
 * values have equal sums. Counts the balanced ranges with choices, modulo
 * 10^9 + 7.
 *
 * Count, for ranges ending at each index, the ways to reach each balance
 * (`nums1` sum minus `nums2` sum): extend the previous ranges, or start a
 * new one, by adding `nums1[i]` or subtracting `nums2[i]`.
 *
 * @see https://leetcode.com/problems/choose-numbers-from-two-arrays-in-range/
 * @difficulty Hard
 * @timeComplexity O(n · S) for S possible balances
 * @spaceComplexity O(S)
 *
 * @example
 * chooseNumbersFromTwoArraysInRange([1, 2, 5], [2, 6, 3]); // 3
 */
export const chooseNumbersFromTwoArraysInRange = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	const MOD = 1_000_000_007;
	const offset =
		Math.max(
			nums1.reduce((sum, v) => sum + v, 0),
			nums2.reduce((sum, v) => sum + v, 0),
		) + 1;
	let ways = new Array<number>(2 * offset + 1).fill(0);
	let balanced = 0;
	for (const [i, a] of nums1.entries()) {
		const b = nums2[i] ?? 0;
		ways[offset] = (ways[offset] ?? 0) + 1;
		const next = new Array<number>(ways.length).fill(0);
		for (const [balance, count] of ways.entries()) {
			if (!count) continue;
			next[balance + a] = ((next[balance + a] ?? 0) + count) % MOD;
			next[balance - b] = ((next[balance - b] ?? 0) + count) % MOD;
		}
		ways = next;
		balanced = (balanced + (ways[offset] ?? 0)) % MOD;
	}
	return balanced;
};
