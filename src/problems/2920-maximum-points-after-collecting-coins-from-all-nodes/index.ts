/**
 * 2920. Maximum Points After Collecting Coins From All Nodes
 *
 * Collecting coins from the root down, each node either gives
 * `coins - k` points or `⌊coins / 2⌋` points while halving every coin
 * count below it. Returns the most points possible.
 *
 * DP on the number of halvings inherited from above; after 14 halvings
 * every coin count is 0, so that's all the states needed.
 *
 * @see https://leetcode.com/problems/maximum-points-after-collecting-coins-from-all-nodes/
 * @difficulty Hard
 * @timeComplexity O(14 · n)
 * @spaceComplexity O(14 · n)
 *
 * @example
 * maximumPointsAfterCollectingCoinsFromAllNodes([[0, 1], [1, 2], [2, 3]], [10, 10, 3, 3], 5); // 11
 */
export const maximumPointsAfterCollectingCoinsFromAllNodes = (
	edges: readonly (readonly number[])[],
	coins: readonly number[],
	k: number,
): number => {
	const n = coins.length;
	const LEVELS = 15;
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const parent = Array.from({ length: n }, () => -1);
	const order = [0];
	for (let i = 0; i < order.length; i++) {
		const node = order[i] ?? 0;
		for (const next of neighbours[node] ?? [])
			if (next !== parent[node]) {
				parent[next] = node;
				order.push(next);
			}
	}
	// best[node][h]: the most points from node's subtree after h halvings above.
	const best = Array.from({ length: n }, () =>
		Array.from({ length: LEVELS }, () => 0),
	);
	for (const node of order.toReversed()) {
		const children = (neighbours[node] ?? []).filter((c) => c !== parent[node]);
		const row = best[node] ?? [];
		for (let h = 0; h < LEVELS; h++) {
			const value = (coins[node] ?? 0) >> h;
			let keep = value - k;
			let halve = value >> 1;
			for (const child of children) {
				keep += best[child]?.[h] ?? 0;
				halve += best[child]?.[Math.min(h + 1, LEVELS - 1)] ?? 0;
			}
			row[h] = Math.max(keep, halve);
		}
	}
	return best[0]?.[0] ?? 0;
};
