import { Heap } from "../../internal/heap";

/**
 * 2737. Find the Closest Marked Node
 *
 * In a weighted directed graph, returns the shortest distance from `s`
 * to any node in `marked`, or -1 if none is reachable.
 *
 * Dijkstra from `s`, stopping at the first marked node popped.
 *
 * @see https://leetcode.com/problems/find-the-closest-marked-node/
 * @difficulty Medium
 * @timeComplexity O(e log e)
 * @spaceComplexity O(n + e)
 *
 * @example
 * findTheClosestMarkedNode(4, [[0, 1, 1], [1, 2, 3], [2, 3, 2], [0, 3, 4]], 0, [2, 3]); // 4
 */
export const findTheClosestMarkedNode = (
	n: number,
	edges: readonly (readonly number[])[],
	s: number,
	marked: readonly number[],
): number => {
	const out: [number, number][][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0, w = 0] of edges) out[a]?.push([b, w]);
	const targets = new Set(marked);
	const best = Array.from({ length: n }, () => Number.POSITIVE_INFINITY);
	best[s] = 0;
	const queue = new Heap<[cost: number, node: number]>(
		(a, b) => a[0] - b[0],
		[[0, s]],
	);
	for (let entry = queue.pop(); entry; entry = queue.pop()) {
		const [cost, node] = entry;
		if (cost > (best[node] ?? 0)) continue;
		if (targets.has(node)) return cost;
		for (const [next, weight] of out[node] ?? [])
			if (cost + weight < (best[next] ?? 0)) {
				best[next] = cost + weight;
				queue.push([cost + weight, next]);
			}
	}
	return -1;
};
