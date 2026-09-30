import { Heap } from "../../internal/heap";

/**
 * 882. Reachable Nodes In Subdivided Graph
 *
 * Each edge `[u, v, cnt]` of an undirected graph is subdivided into a chain
 * with `cnt` new nodes. Returns how many nodes of the new graph are within
 * `maxMoves` steps of node 0.
 *
 * Dijkstra's algorithm on the original nodes, where an edge costs
 * `cnt + 1`. Each reached original node counts, and on each edge the new
 * nodes covered from both ends (the moves left at each end, capped at
 * `cnt` together) count too.
 *
 * @see https://leetcode.com/problems/reachable-nodes-in-subdivided-graph/
 * @difficulty Hard
 * @timeComplexity O(E log E)
 * @spaceComplexity O(n + E)
 *
 * @example
 * reachableNodesInSubdividedGraph([[0, 1, 10], [0, 2, 1], [1, 2, 2]], 6, 3); // 13
 */
export const reachableNodesInSubdividedGraph = (
	edges: readonly (readonly number[])[],
	maxMoves: number,
	n: number,
): number => {
	const neighbours: [node: number, cost: number][][] = Array.from(
		{ length: n },
		() => [],
	);
	for (const [u = 0, v = 0, count = 0] of edges) {
		neighbours[u]?.push([v, count + 1]);
		neighbours[v]?.push([u, count + 1]);
	}

	const distance = new Array<number>(n).fill(Number.POSITIVE_INFINITY);
	distance[0] = 0;
	const queue = new Heap<[number, number]>((a, b) => a[0] - b[0], [[0, 0]]);
	for (let entry = queue.pop(); entry; entry = queue.pop()) {
		const [d, node] = entry;
		if (d > (distance[node] ?? 0)) continue;
		for (const [next, cost] of neighbours[node] ?? []) {
			if (d + cost < (distance[next] ?? 0)) {
				distance[next] = d + cost;
				queue.push([d + cost, next]);
			}
		}
	}

	let reachable = distance.filter((d) => d <= maxMoves).length;
	for (const [u = 0, v = 0, count = 0] of edges) {
		const fromU = Math.max(0, maxMoves - (distance[u] ?? 0));
		const fromV = Math.max(0, maxMoves - (distance[v] ?? 0));
		reachable += Math.min(count, fromU + fromV);
	}
	return reachable;
};
