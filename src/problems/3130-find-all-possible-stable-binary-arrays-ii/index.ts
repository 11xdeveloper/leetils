const MOD = 1_000_000_007;

/**
 * 3130. Find All Possible Stable Binary Arrays II
 *
 * Count binary arrays with exactly `zero` zeros and `one` ones and no run
 * of equal values longer than `limit`, modulo 10⁹ + 7.
 *
 * Let `end0[i][j]` count such arrays with i zeros and j ones ending in 0
 * (and `end1` likewise). Appending a 0 to any shorter array works, except
 * when that makes a run of `limit + 1` zeros, which happens exactly for the
 * arrays that ended in 1 just before those zeros: subtract those.
 *
 * @see https://leetcode.com/problems/find-all-possible-stable-binary-arrays-ii/
 * @difficulty Hard
 * @timeComplexity O(zero · one)
 * @spaceComplexity O(zero · one)
 *
 * @example
 * findAllPossibleStableBinaryArraysII(1, 1, 2); // 2
 */
export const findAllPossibleStableBinaryArraysII = (
	zero: number,
	one: number,
	limit: number,
): number => {
	const width = one + 1;
	const end0 = new Float64Array((zero + 1) * width);
	const end1 = new Float64Array((zero + 1) * width);
	const at = (i: number, j: number): number => i * width + j;
	for (let i = 1; i <= Math.min(zero, limit); i++) end0[at(i, 0)] = 1;
	for (let j = 1; j <= Math.min(one, limit); j++) end1[at(0, j)] = 1;
	for (let i = 1; i <= zero; i++)
		for (let j = 1; j <= one; j++) {
			let zeros = (end0[at(i - 1, j)] ?? 0) + (end1[at(i - 1, j)] ?? 0);
			if (i > limit) zeros -= end1[at(i - limit - 1, j)] ?? 0;
			let ones = (end0[at(i, j - 1)] ?? 0) + (end1[at(i, j - 1)] ?? 0);
			if (j > limit) ones -= end0[at(i, j - limit - 1)] ?? 0;
			end0[at(i, j)] = ((zeros % MOD) + MOD) % MOD;
			end1[at(i, j)] = ((ones % MOD) + MOD) % MOD;
		}
	return ((end0[at(zero, one)] ?? 0) + (end1[at(zero, one)] ?? 0)) % MOD;
};
