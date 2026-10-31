import { Heap } from "../../internal/heap";

/**
 * 2203. Minimum Weighted Subgraph With the Required Paths
 *
 * Returns the least total weight of a subgraph of the weighted digraph in
 * which both `src1` and `src2` can reach `dest`, or -1.
 *
 * The cheapest subgraph is two paths that merge at some node `v` and
 * continue together. Run Dijkstra from each source and, on the reversed
 * graph, from `dest`, then try every `v`.
 *
 * @see https://leetcode.com/problems/minimum-weighted-subgraph-with-the-required-paths/
 * @difficulty Hard
 * @timeComplexity O((n + e) log e)
 * @spaceComplexity O(n + e)
 *
 * @example
 * minimumWeightedSubgraphWithTheRequiredPaths(3, [[0, 1, 1], [2, 1, 1]], 0, 1, 2); // -1
 */
export const minimumWeightedSubgraphWithTheRequiredPaths = (
	n: number,
	edges: readonly (readonly number[])[],
	src1: number,
	src2: number,
	dest: number,
): number => {
	const forward: [number, number][][] = Array.from({ length: n }, () => []);
	const backward: [number, number][][] = Array.from({ length: n }, () => []);
	for (const [from = 0, to = 0, weight = 0] of edges) {
		forward[from]?.push([to, weight]);
		backward[to]?.push([from, weight]);
	}
	const dijkstra = (graph: [number, number][][], source: number): number[] => {
		const distance = new Array<number>(n).fill(Infinity);
		distance[source] = 0;
		const heap = new Heap<[number, number]>(
			(a, b) => a[0] - b[0],
			[[0, source]],
		);
		for (let entry = heap.pop(); entry; entry = heap.pop()) {
			const [d, node] = entry;
			if (d > (distance[node] ?? Infinity)) continue;
			for (const [next, weight] of graph[node] ?? []) {
				if (d + weight >= (distance[next] ?? Infinity)) continue;
				distance[next] = d + weight;
				heap.push([d + weight, next]);
			}
		}
		return distance;
	};
	const [from1, from2, toDest] = [
		dijkstra(forward, src1),
		dijkstra(forward, src2),
		dijkstra(backward, dest),
	];
	let best = Infinity;
	for (let v = 0; v < n; v++)
		best = Math.min(
			best,
			(from1[v] ?? Infinity) + (from2[v] ?? Infinity) + (toDest[v] ?? Infinity),
		);
	return best === Infinity ? -1 : best;
};
