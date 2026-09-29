/**
 * 629. K Inverse Pairs Array
 *
 * Counts the permutations of 1 to `n` with exactly `k` inverse pairs
 * (`i < j` but `a[i] > a[j]`), modulo 10^9 + 7.
 *
 * Placing `n` into a permutation of 1 to `n - 1` adds between 0 and `n - 1`
 * inverse pairs, depending on how far from the end it goes. So
 * `ways[n][k]` is the sum of `ways[n - 1][k - j]` for `j` from 0 to
 * `n - 1`, a sliding window kept with prefix sums.
 *
 * @see https://leetcode.com/problems/k-inverse-pairs-array/
 * @difficulty Hard
 * @timeComplexity O(n · k)
 * @spaceComplexity O(k)
 *
 * @example
 * kInversePairsArray(3, 1); // 2: [1, 3, 2] and [2, 1, 3]
 */
export const kInversePairsArray = (n: number, k: number): number => {
	const MOD = 1_000_000_007;
	let ways = new Array<number>(k + 1).fill(0);
	ways[0] = 1;

	for (let size = 2; size <= n; size++) {
		const next = new Array<number>(k + 1).fill(0);
		let window = 0;
		for (let pairs = 0; pairs <= k; pairs++) {
			window = (window + (ways[pairs] ?? 0)) % MOD;
			if (pairs >= size)
				window = (window - (ways[pairs - size] ?? 0) + MOD) % MOD;
			next[pairs] = window;
		}
		ways = next;
	}

	return ways[k] ?? 0;
};
