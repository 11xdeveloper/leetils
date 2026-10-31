const MOD = 1_000_000_007;

/**
 * 2518. Number of Great Partitions
 *
 * Returns the number of ways to split `nums` into two ordered groups that
 * each sum to at least `k`, modulo 1e9 + 7.
 *
 * If the total is under `2k` there are none. Otherwise a group can't be
 * too small on both sides at once, so subtract twice the subsets summing
 * below `k`, counted with a knapsack, from all `2ⁿ` splits.
 *
 * @see https://leetcode.com/problems/number-of-great-partitions/
 * @difficulty Hard
 * @timeComplexity O(n · k)
 * @spaceComplexity O(k)
 *
 * @example
 * numberOfGreatPartitions([1, 2, 3, 4], 4); // 6
 */
export const numberOfGreatPartitions = (
	nums: readonly number[],
	k: number,
): number => {
	if (nums.reduce((sum, num) => sum + num, 0) < 2 * k) return 0;

	const ways = Array.from({ length: k }, () => 0);
	ways[0] = 1;
	let total = 1;
	for (const num of nums) {
		total = (total * 2) % MOD;
		for (let sum = k - 1; sum >= num; sum--)
			ways[sum] = ((ways[sum] ?? 0) + (ways[sum - num] ?? 0)) % MOD;
	}
	const small = ways.reduce((sum, count) => (sum + count) % MOD, 0);
	return (((total - 2 * small) % MOD) + MOD) % MOD;
};
