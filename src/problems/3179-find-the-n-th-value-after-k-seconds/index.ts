const MOD = 1_000_000_007;

/**
 * 3179. Find the N-th Value After K Seconds
 *
 * Start with `n` ones, and each second replace every element with the sum
 * of itself and everything before it. Returns the last element after `k`
 * seconds, modulo 10⁹ + 7.
 *
 * Apply the prefix sums `k` times.
 *
 * @see https://leetcode.com/problems/find-the-n-th-value-after-k-seconds/
 * @difficulty Medium
 * @timeComplexity O(n · k)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheNThValueAfterKSeconds(4, 5); // 56
 */
export const findTheNThValueAfterKSeconds = (n: number, k: number): number => {
	const values = new Array<number>(n).fill(1);
	for (let second = 0; second < k; second++)
		for (let i = 1; i < n; i++)
			values[i] = ((values[i] ?? 0) + (values[i - 1] ?? 0)) % MOD;
	return values[n - 1] ?? 0;
};
