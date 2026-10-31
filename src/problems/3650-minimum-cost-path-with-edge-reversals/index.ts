import { Heap } from "../../internal/heap";

/**
 * 3650. Minimum Cost Path with Edge Reversals
 *
 * In a weighted directed graph, each node may once reverse one of its
 * incoming edges and cross it straight away, at twice its weight. Returns
 * the cheapest way from node 0 to node n - 1, or -1.
 *
 * A shortest path never revisits a node, so each switch is used at most
 * once anyway: Dijkstra over the edges plus their reverses at double cost.
 *
 * @see https://leetcode.com/problems/minimum-cost-path-with-edge-reversals/
 * @difficulty Medium
 * @timeComplexity O((n + m) log m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * minimumCostPathWithEdgeReversals(4, [[0, 1, 3], [3, 1, 1], [2, 3, 4], [0, 2, 2]]); // 5
 */
export const minimumCostPathWithEdgeReversals = (
	n: number,
	edges: readonly (readonly number[])[],
): number => {
	const adjacent: [to: number, cost: number][][] = Array.from(
		{ length: n },
		() => [],
	);
	for (const [u = 0, v = 0, w = 0] of edges) {
		adjacent[u]?.push([v, w]);
		adjacent[v]?.push([u, 2 * w]);
	}
	const best = new Array<number>(n).fill(Number.POSITIVE_INFINITY);
	best[0] = 0;
	const heap = new Heap<[cost: number, node: number]>(
		(a, b) => a[0] - b[0],
		[[0, 0]],
	);
	while (heap.size > 0) {
		const [cost, node] = heap.pop() ?? [0, 0];
		if (cost > (best[node] ?? 0)) continue;
		if (node === n - 1) return cost;
		for (const [to, w] of adjacent[node] ?? [])
			if (cost + w < (best[to] ?? 0)) {
				best[to] = cost + w;
				heap.push([cost + w, to]);
			}
	}
	return -1;
};
