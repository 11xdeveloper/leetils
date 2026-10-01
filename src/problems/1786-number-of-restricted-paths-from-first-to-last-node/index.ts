import { Heap } from "../../internal/heap";

/**
 * 1786. Number of Restricted Paths From First to Last Node
 *
 * A path from node 1 to node `n` is restricted if every step strictly
 * lowers the shortest distance to `n`. Counts restricted paths, modulo
 * 10^9 + 7.
 *
 * Dijkstra from `n` gives the distances. Restricted steps always go to a
 * closer node, so count paths in order of increasing distance: each node's
 * count sums the counts of its closer neighbours.
 *
 * @see https://leetcode.com/problems/number-of-restricted-paths-from-first-to-last-node/
 * @difficulty Medium
 * @timeComplexity O((n + e) log n)
 * @spaceComplexity O(n + e)
 *
 * @example
 * numberOfRestrictedPathsFromFirstToLastNode(5, [[1, 2, 3], [1, 3, 3], [2, 3, 1], [1, 4, 2], [5, 2, 2], [3, 5, 1], [5, 4, 10]]); // 3
 */
export const numberOfRestrictedPathsFromFirstToLastNode = (
	n: number,
	edges: readonly (readonly number[])[],
): number => {
	const neighbours: [node: number, weight: number][][] = Array.from(
		{ length: n + 1 },
		() => [],
	);
	for (const [u = 0, v = 0, w = 0] of edges) {
		neighbours[u]?.push([v, w]);
		neighbours[v]?.push([u, w]);
	}
	const distance = new Array<number>(n + 1).fill(Infinity);
	distance[n] = 0;
	const heap = new Heap<[number, number]>((a, b) => a[0] - b[0], [[0, n]]);
	const order: number[] = [];
	for (let entry = heap.pop(); entry; entry = heap.pop()) {
		const [d, node] = entry;
		if (d > (distance[node] ?? 0)) continue;
		order.push(node);
		for (const [next, w] of neighbours[node] ?? []) {
			if (d + w >= (distance[next] ?? 0)) continue;
			distance[next] = d + w;
			heap.push([d + w, next]);
		}
	}
	const paths = new Array<number>(n + 1).fill(0);
	paths[n] = 1;
	for (const node of order) {
		for (const [next] of neighbours[node] ?? []) {
			if ((distance[next] ?? 0) < (distance[node] ?? 0))
				paths[node] = ((paths[node] ?? 0) + (paths[next] ?? 0)) % 1_000_000_007;
		}
		if (node === 1) break;
	}
	return paths[1] ?? 0;
};
