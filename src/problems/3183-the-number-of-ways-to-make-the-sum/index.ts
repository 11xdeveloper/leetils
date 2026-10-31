const MOD = 1_000_000_007;

/**
 * 3183. The Number of Ways to Make the Sum
 *
 * How many ways (ignoring order) to make `n` from unlimited coins of 1, 2
 * and 6 and at most two coins of 4, modulo 10⁹ + 7.
 *
 * Count the ways with 1, 2 and 6 by the usual coin-change dynamic
 * programming, then add the ways with one or two 4s set aside.
 *
 * @see https://leetcode.com/problems/the-number-of-ways-to-make-the-sum/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * theNumberOfWaysToMakeTheSum(4); // 4
 */
export const theNumberOfWaysToMakeTheSum = (n: number): number => {
	const ways = new Array<number>(n + 1).fill(0);
	ways[0] = 1;
	for (const coin of [1, 2, 6])
		for (let sum = coin; sum <= n; sum++)
			ways[sum] = ((ways[sum] ?? 0) + (ways[sum - coin] ?? 0)) % MOD;
	return ((ways[n] ?? 0) + (ways[n - 4] ?? 0) + (ways[n - 8] ?? 0)) % MOD;
};
