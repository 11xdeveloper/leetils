const MOD = 1_000_000_007n;

/**
 * 3987. Minimum Total Cost to Process All Elements
 *
 * Starting with `k` resources, process `nums` in order, each element using
 * up its value. When short, an operation adds k resources; the t-th
 * operation costs t. Returns the least total cost, modulo 1e9+7.
 *
 * Only the number of operations matters: the fewest that cover the whole
 * sum is ⌈sum / k⌉ - 1, and c operations cost c(c + 1)/2.
 *
 * @see https://leetcode.com/problems/minimum-total-cost-to-process-all-elements/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumTotalCostToProcessAllElements([1, 1, 7, 14], 4); // 15
 */
export const minimumTotalCostToProcessAllElements = (
	nums: readonly number[],
	k: number,
): number => {
	const total = nums.reduce((sum, x) => sum + BigInt(x), 0n);
	const big = BigInt(k);
	const operations = (total + big - 1n) / big - 1n;
	if (operations <= 0n) return 0;
	return Number(((operations * (operations + 1n)) / 2n) % MOD);
};
