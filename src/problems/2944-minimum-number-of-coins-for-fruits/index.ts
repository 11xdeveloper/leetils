/**
 * 2944. Minimum Number of Coins for Fruits
 *
 * Buying fruit `i`, counting from 1, costs `prices[i - 1]` and makes the
 * next `i` fruits free (you may still buy them). Returns the fewest coins
 * to get every fruit.
 *
 * DP from the back: the cheapest way to cover fruits `i` onwards, having
 * bought fruit `i`, is its price plus the cheapest purchase among the
 * fruits up to `2i + 1`, or nothing if those reach the end.
 *
 * @see https://leetcode.com/problems/minimum-number-of-coins-for-fruits/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumNumberOfCoinsForFruits([1, 10, 1, 1]); // 2
 */
export const minimumNumberOfCoinsForFruits = (
	prices: readonly number[],
): number => {
	const n = prices.length;
	const cost = Array.from({ length: n + 2 }, () => 0);
	for (let i = n; i >= 1; i--) {
		let next = 2 * i + 1 > n ? 0 : Number.POSITIVE_INFINITY;
		for (let j = i + 1; j <= Math.min(n, 2 * i + 1); j++)
			next = Math.min(next, cost[j] ?? 0);
		cost[i] = (prices[i - 1] ?? 0) + next;
	}
	return cost[1] ?? 0;
};
