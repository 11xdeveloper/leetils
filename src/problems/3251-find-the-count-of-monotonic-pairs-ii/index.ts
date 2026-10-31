const MOD = 1_000_000_007;

/**
 * 3251. Find the Count of Monotonic Pairs II
 *
 * Count the pairs of non-negative arrays, `arr1` non-decreasing and `arr2`
 * non-increasing, with `arr1[i] + arr2[i] = nums[i]`, modulo 10⁹ + 7.
 *
 * `arr1` decides everything. Let `ways[v]` count valid prefixes ending with
 * `arr1[i] = v`. The previous value u must satisfy u ≤ v and also
 * `nums[i - 1] - u ≥ nums[i] - v`, so u ≤ v - max(0, nums[i] - nums[i - 1]):
 * a prefix sum of the previous row.
 *
 * @see https://leetcode.com/problems/find-the-count-of-monotonic-pairs-ii/
 * @difficulty Hard
 * @timeComplexity O(n · max)
 * @spaceComplexity O(max)
 *
 * @example
 * findTheCountOfMonotonicPairsII([2, 3, 2]); // 4
 */
export const findTheCountOfMonotonicPairsII = (
	nums: readonly number[],
): number => {
	const max = Math.max(...nums);
	let ways = new Array<number>(max + 1).fill(0);
	for (let v = 0; v <= (nums[0] ?? 0); v++) ways[v] = 1;
	for (let i = 1; i < nums.length; i++) {
		const shift = Math.max(0, (nums[i] ?? 0) - (nums[i - 1] ?? 0));
		const prefix = new Array<number>(max + 2).fill(0);
		for (let u = 0; u <= max; u++)
			prefix[u + 1] = ((prefix[u] ?? 0) + (ways[u] ?? 0)) % MOD;
		const next = new Array<number>(max + 1).fill(0);
		for (let v = shift; v <= (nums[i] ?? 0); v++)
			next[v] = prefix[v - shift + 1] ?? 0;
		ways = next;
	}
	return ways.reduce((total, count) => (total + count) % MOD, 0);
};
