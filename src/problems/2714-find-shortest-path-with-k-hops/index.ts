import { Heap } from "../../internal/heap";

/**
 * 2714. Find Shortest Path with K Hops
 *
 * In a weighted undirected graph, up to `k` edges along the path can be
 * hopped over for free. Returns the cheapest path from `s` to `d`.
 *
 * Dijkstra over `(node, hops used)` states.
 *
 * @see https://leetcode.com/problems/find-shortest-path-with-k-hops/
 * @difficulty Hard
 * @timeComplexity O(k · e log(k · n))
 * @spaceComplexity O(k · n + e)
 *
 * @example
 * findShortestPathWithKHops(4, [[0, 1, 4], [0, 2, 2], [2, 3, 6]], 1, 3, 2); // 2
 */
export const findShortestPathWithKHops = (
	n: number,
	edges: readonly (readonly number[])[],
	s: number,
	d: number,
	k: number,
): number => {
	const neighbours: [number, number][][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0, w = 0] of edges) {
		neighbours[a]?.push([b, w]);
		neighbours[b]?.push([a, w]);
	}
	const best = Array.from(
		{ length: n * (k + 1) },
		() => Number.POSITIVE_INFINITY,
	);
	best[s * (k + 1)] = 0;
	const queue = new Heap<[cost: number, node: number, hops: number]>(
		(a, b) => a[0] - b[0],
		[[0, s, 0]],
	);
	for (let entry = queue.pop(); entry; entry = queue.pop()) {
		const [cost, node, hops] = entry;
		if (node === d) return cost;
		if (cost > (best[node * (k + 1) + hops] ?? 0)) continue;
		for (const [next, weight] of neighbours[node] ?? [])
			for (const [extra, used] of [
				[weight, hops],
				[0, hops + 1],
			] as const) {
				if (used > k) continue;
				const state = next * (k + 1) + used;
				if (cost + extra < (best[state] ?? 0)) {
					best[state] = cost + extra;
					queue.push([cost + extra, next, used]);
				}
			}
	}
	return -1;
};
