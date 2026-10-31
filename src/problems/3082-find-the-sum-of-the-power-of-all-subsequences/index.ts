const MOD = 1_000_000_007;

/**
 * 3082. Find the Sum of the Power of All Subsequences
 *
 * An array's power is how many of its subsequences add up to `k`. Returns
 * the total power of all subsequences of `nums`, modulo 10⁹ + 7.
 *
 * Count pairs (subsequence, sub-subsequence summing to `k`) at once: each
 * element is either in the inner one, or in the outer one only, or in
 * neither. So a knapsack over sums where skipping an element doubles the
 * count and taking it shifts the sum.
 *
 * @see https://leetcode.com/problems/find-the-sum-of-the-power-of-all-subsequences/
 * @difficulty Hard
 * @timeComplexity O(n · k)
 * @spaceComplexity O(k)
 *
 * @example
 * findTheSumOfThePowerOfAllSubsequences([1, 2, 3], 3); // 6
 */
export const findTheSumOfThePowerOfAllSubsequences = (
	nums: readonly number[],
	k: number,
): number => {
	const ways = new Array<number>(k + 1).fill(0);
	ways[0] = 1;
	for (const num of nums)
		for (let sum = k; sum >= 0; sum--)
			ways[sum] =
				(2 * (ways[sum] ?? 0) + (sum >= num ? (ways[sum - num] ?? 0) : 0)) %
				MOD;
	return ways[k] ?? 0;
};
