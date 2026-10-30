/**
 * 2969. Minimum Number of Coins for Fruits II
 *
 * Buying fruit `i`, counting from 1, costs `prices[i - 1]` and makes the
 * next `i` fruits free (you may still buy them). Returns the fewest coins
 * to get every fruit, for arrays too long for a quadratic scan.
 *
 * DP from the back: having bought fruit `i`, the next purchase is the
 * cheapest among fruits `i + 1` to `2i + 1`, unless those reach the end.
 * That window slides left, so a monotonic deque keeps its minimum.
 *
 * @see https://leetcode.com/problems/minimum-number-of-coins-for-fruits-ii/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumNumberOfCoinsForFruitsII([26, 18, 6, 12, 49, 7, 45, 45]); // 39
 */
export const minimumNumberOfCoinsForFruitsII = (
	prices: readonly number[],
): number => {
	const n = prices.length;
	const cost = Array.from({ length: n + 2 }, () => 0);
	// Fruit indices with increasing cost, the window's minimum at the front.
	const window: number[] = [];
	let head = 0;
	for (let i = n; i >= 1; i--) {
		while (head < window.length && (window[head] ?? 0) > 2 * i + 1) head++;
		const next = 2 * i + 1 > n ? 0 : (cost[window[head] ?? 0] ?? 0);
		cost[i] = (prices[i - 1] ?? 0) + next;
		while (
			window.length > head &&
			(cost[window.at(-1) ?? 0] ?? 0) >= (cost[i] ?? 0)
		)
			window.pop();
		window.push(i);
	}
	return cost[1] ?? 0;
};
