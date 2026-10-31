const MOD = 1_000_000_007;

/**
 * 3686. Number of Stable Subsequences
 *
 * Counts the non-empty subsequences of `nums` with no three consecutive
 * elements of the same parity, modulo 1e9+7.
 *
 * Count subsequences by the parity of their last element and how many in
 * a row share it (one or two); each element extends those it's allowed
 * to.
 *
 * @see https://leetcode.com/problems/number-of-stable-subsequences/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfStableSubsequences([2, 3, 4, 2]); // 14
 */
export const numberOfStableSubsequences = (nums: readonly number[]): number => {
	// ends[parity][run - 1]
	const ends = [
		[0, 0],
		[0, 0],
	];
	for (const num of nums) {
		const p = num % 2;
		const same = ends[p] as number[];
		const other = ends[1 - p] as number[];
		const single = (1 + (other[0] ?? 0) + (other[1] ?? 0)) % MOD;
		same[1] = ((same[1] ?? 0) + (same[0] ?? 0)) % MOD;
		same[0] = ((same[0] ?? 0) + single) % MOD;
	}
	return ends.flat().reduce((a, b) => (a + b) % MOD, 0);
};
