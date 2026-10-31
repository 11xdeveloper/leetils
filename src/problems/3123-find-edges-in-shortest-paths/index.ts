import { Heap } from "../../internal/heap";

/**
 * 3123. Find Edges in Shortest Paths
 *
 * For each edge of an undirected weighted graph, whether it lies on some
 * shortest path from node 0 to node n - 1.
 *
 * Run Dijkstra from both ends. An edge is on a shortest path if crossing it
 * one way or the other adds up to the shortest distance.
 *
 * @see https://leetcode.com/problems/find-edges-in-shortest-paths/
 * @difficulty Hard
 * @timeComplexity O((n + e) log e)
 * @spaceComplexity O(n + e)
 *
 * @example
 * findEdgesInShortestPaths(4, [[2, 0, 1], [0, 1, 1], [0, 3, 4], [3, 2, 2]]); // [true, false, true, true]
 */
export const findEdgesInShortestPaths = (
	n: number,
	edges: readonly (readonly number[])[],
): boolean[] => {
	const adjacent: [next: number, weight: number][][] = Array.from(
		{ length: n },
		() => [],
	);
	for (const [u = 0, v = 0, w = 0] of edges) {
		adjacent[u]?.push([v, w]);
		adjacent[v]?.push([u, w]);
	}
	const dijkstra = (source: number): number[] => {
		const distance = new Array<number>(n).fill(Number.POSITIVE_INFINITY);
		distance[source] = 0;
		const queue = new Heap<[number, number]>(
			(a, b) => a[0] - b[0],
			[[0, source]],
		);
		for (let top = queue.pop(); top; top = queue.pop()) {
			const [d, node] = top;
			if (d > (distance[node] ?? 0)) continue;
			for (const [next, w] of adjacent[node] ?? [])
				if (d + w < (distance[next] ?? 0)) {
					distance[next] = d + w;
					queue.push([d + w, next]);
				}
		}
		return distance;
	};
	const fromStart = dijkstra(0);
	const fromEnd = dijkstra(n - 1);
	const shortest = fromStart[n - 1] ?? Number.POSITIVE_INFINITY;
	return edges.map(
		([u = 0, v = 0, w = 0]) =>
			shortest !== Number.POSITIVE_INFINITY &&
			((fromStart[u] ?? 0) + w + (fromEnd[v] ?? 0) === shortest ||
				(fromStart[v] ?? 0) + w + (fromEnd[u] ?? 0) === shortest),
	);
};
