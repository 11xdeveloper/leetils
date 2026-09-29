/**
 * 518. Coin Change II
 *
 * Counts the combinations of coins (each denomination usable any number of
 * times) that add up to `amount`. Order doesn't matter.
 *
 * Unbounded knapsack: `ways[x]` counts combinations reaching `x`. Adding
 * one denomination at a time, in the outer loop, counts each combination
 * once rather than once per ordering.
 *
 * @see https://leetcode.com/problems/coin-change-ii/
 * @difficulty Medium
 * @timeComplexity O(amount · coins)
 * @spaceComplexity O(amount)
 *
 * @example
 * coinChangeII(5, [1, 2, 5]); // 4
 */
export const coinChangeII = (
	amount: number,
	coins: readonly number[],
): number => {
	const ways = new Array<number>(amount + 1).fill(0);
	ways[0] = 1;
	for (const coin of coins) {
		for (let x = coin; x <= amount; x++)
			ways[x] = (ways[x] ?? 0) + (ways[x - coin] ?? 0);
	}
	return ways[amount] ?? 0;
};
