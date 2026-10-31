/**
 * 3592. Inverse Coin Change
 *
 * `numWays[i - 1]` is how many ways some set of distinct denominations
 * makes amount i, using any number of each. Returns the denominations in
 * increasing order, or `[]` if no set fits.
 *
 * Decide amounts in increasing order: smaller coins alone give some count
 * for amount i, and a coin of value i adds exactly one more way. So add
 * the coin when one way is missing, and give up on any other mismatch.
 *
 * @see https://leetcode.com/problems/inverse-coin-change/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * inverseCoinChange([0, 1, 0, 2, 0, 3, 0, 4, 0, 5]); // [2, 4, 6]
 */
export const inverseCoinChange = (numWays: readonly number[]): number[] => {
	const n = numWays.length;
	const ways = new Array<number>(n + 1).fill(0);
	ways[0] = 1;
	const coins: number[] = [];
	for (let amount = 1; amount <= n; amount++) {
		const want = numWays[amount - 1] ?? 0;
		if (ways[amount] === want) continue;
		if ((ways[amount] ?? 0) + 1 !== want) return [];
		coins.push(amount);
		for (let total = amount; total <= n; total++)
			ways[total] = (ways[total] ?? 0) + (ways[total - amount] ?? 0);
	}
	return coins;
};
