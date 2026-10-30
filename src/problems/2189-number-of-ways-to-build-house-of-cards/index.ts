/**
 * 2189. Number of Ways to Build House of Cards
 *
 * A row of `k` triangles takes `3k - 1` cards (two per triangle plus a
 * card between each pair), and every row sits on a wider one. Counts the
 * distinct houses using exactly `n` cards.
 *
 * Rows have strictly decreasing widths, so a house is a set of distinct
 * row sizes summing to `n`: a 0/1 knapsack over the sizes `3k - 1`.
 *
 * @see https://leetcode.com/problems/number-of-ways-to-build-house-of-cards/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfWaysToBuildHouseOfCards(16); // 2
 */
export const numberOfWaysToBuildHouseOfCards = (n: number): number => {
	const ways = new Array<number>(n + 1).fill(0);
	ways[0] = 1;
	for (let row = 2; row <= n; row += 3) {
		for (let cards = n; cards >= row; cards--)
			ways[cards] = (ways[cards] ?? 0) + (ways[cards - row] ?? 0);
	}
	return ways[n] ?? 0;
};
