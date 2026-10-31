/**
 * 3772. Maximum Subgraph Score in a Tree
 *
 * Each node of a tree is good (`good[i]` = 1) or bad. A connected set of
 * nodes scores its good nodes minus its bad ones. For each node, returns
 * the best score of a connected set containing it.
 *
 * Rerooting: first the best set within each node's subtree containing it
 * (its value plus every child's best that's positive), then pass down the
 * best through each parent, excluding the child's own contribution.
 *
 * @see https://leetcode.com/problems/maximum-subgraph-score-in-a-tree/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumSubgraphScoreInATree(3, [[0, 1], [1, 2]], [1, 0, 1]); // [1, 1, 1]
 */
export const maximumSubgraphScoreInATree = (
	n: number,
	edges: readonly (readonly number[])[],
	good: readonly number[],
): number[] => {
	const adjacent: number[][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0] of edges) {
		adjacent[u]?.push(v);
		adjacent[v]?.push(u);
	}
	const parent = new Int32Array(n).fill(-1);
	const order = [0];
	for (let i = 0; i < order.length; i++) {
		const v = order[i] ?? 0;
		for (const to of adjacent[v] ?? [])
			if (to !== parent[v] && to !== 0) {
				parent[to] = v;
				order.push(to);
			}
	}
	const down = good.map((g): number => (g ? 1 : -1));
	for (let i = n - 1; i > 0; i--) {
		const v = order[i] ?? 0;
		down[parent[v] ?? 0] =
			(down[parent[v] ?? 0] ?? 0) + Math.max(0, down[v] ?? 0);
	}
	const best = [...down];
	for (let i = 1; i < n; i++) {
		const v = order[i] ?? 0;
		const fromParent = (best[parent[v] ?? 0] ?? 0) - Math.max(0, down[v] ?? 0);
		best[v] = (down[v] ?? 0) + Math.max(0, fromParent);
	}
	return best;
};
