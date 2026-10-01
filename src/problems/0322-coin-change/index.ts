/**
 * 322. Coin Change
 *
 * Returns the fewest coins from `coins` (with unlimited coins of each value)
 * that add up to `amount`, or -1 if it can't be made.
 *
 * Dynamic programming over amounts: the fewest coins for an amount is one
 * more than the fewest for the amount left after some coin.
 *
 * @see https://leetcode.com/problems/coin-change/
 * @difficulty Medium
 * @timeComplexity O(amount * k) where k is the number of coin values
 * @spaceComplexity O(amount)
 *
 * @example
 * coinChange([1, 2, 5], 11); // 3: 5 + 5 + 1
 */
export const coinChange = (
	coins: readonly number[],
	amount: number,
): number => {
	const fewest = new Array<number>(amount + 1).fill(Number.POSITIVE_INFINITY);
	fewest[0] = 0;

	for (let value = 1; value <= amount; value++) {
		for (const coin of coins) {
			if (coin <= value)
				fewest[value] = Math.min(
					fewest[value] ?? 0,
					(fewest[value - coin] ?? 0) + 1,
				);
		}
	}

	const result = fewest[amount] ?? Number.POSITIVE_INFINITY;
	return result === Number.POSITIVE_INFINITY ? -1 : result;
};
