/**
 * 441. Arranging Coins
 *
 * Builds a staircase from `n` coins, where row `i` needs `i` coins, and
 * returns how many complete rows it has.
 *
 * `k` rows use k(k + 1)/2 coins, so the answer is the largest `k` with
 * k(k + 1)/2 ≤ n, found by solving the quadratic and correcting for
 * floating-point rounding.
 *
 * @see https://leetcode.com/problems/arranging-coins/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * arrangingCoins(8); // 3
 */
export const arrangingCoins = (n: number): number => {
	let rows = Math.floor((Math.sqrt(8 * n + 1) - 1) / 2);
	while ((rows * (rows + 1)) / 2 > n) rows--;
	while (((rows + 1) * (rows + 2)) / 2 <= n) rows++;
	return rows;
};
