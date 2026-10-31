/**
 * 3108. Minimum Cost Walk in Weighted Graph
 *
 * A walk's cost is the bitwise AND of its edges' weights, which may repeat.
 * Returns, for each query `[s, t]`, the cheapest walk from `s` to `t`, or
 * -1 if they're not connected.
 *
 * ANDing more edges never raises the cost, and a walk can visit every edge
 * of its component, so the answer is the AND of all the component's edges.
 * Group nodes with union-find, ANDing weights into each root.
 *
 * @see https://leetcode.com/problems/minimum-cost-walk-in-weighted-graph/
 * @difficulty Hard
 * @timeComplexity O((n + e + q) α(n))
 * @spaceComplexity O(n)
 *
 * @example
 * minimumCostWalkInWeightedGraph(5, [[0, 1, 7], [1, 3, 7], [1, 2, 1]], [[0, 3], [3, 4]]); // [1, -1]
 */
export const minimumCostWalkInWeightedGraph = (
	n: number,
	edges: readonly (readonly number[])[],
	query: readonly (readonly number[])[],
): number[] => {
	const parent = Array.from({ length: n }, (_, i) => i);
	const cost = new Array<number>(n).fill(-1);
	const find = (x: number): number => {
		let root = x;
		while (parent[root] !== root) root = parent[root] ?? root;
		for (let node = x; node !== root; ) {
			const next = parent[node] ?? root;
			parent[node] = root;
			node = next;
		}
		return root;
	};
	for (const [u = 0, v = 0, w = 0] of edges) {
		const a = find(u);
		const b = find(v);
		parent[a] = b;
		cost[b] = (cost[b] ?? -1) & (cost[a] ?? -1) & w;
	}
	return query.map(([s = 0, t = 0]) => {
		const root = find(s);
		return root === find(t) ? (cost[root] ?? -1) : -1;
	});
};
