import { Heap } from "../../internal/heap";

/**
 * 3604. Minimum Time to Reach Destination in Directed Graph
 *
 * Edge `[u, v, start, end]` can be taken from u at any time between start
 * and end, arriving at v one unit later; you may wait anywhere. Starting
 * at node 0 at time 0, returns the earliest arrival at node n - 1, or -1.
 *
 * Dijkstra on arrival time: arriving earlier never hurts, since you can
 * wait for an edge to open.
 *
 * @see https://leetcode.com/problems/minimum-time-to-reach-destination-in-directed-graph/
 * @difficulty Medium
 * @timeComplexity O((n + m) log m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * minimumTimeToReachDestinationInDirectedGraph(3, [[0, 1, 0, 1], [1, 2, 2, 5]]); // 3
 */
export const minimumTimeToReachDestinationInDirectedGraph = (
	n: number,
	edges: readonly (readonly number[])[],
): number => {
	const outgoing: [to: number, start: number, end: number][][] = Array.from(
		{ length: n },
		() => [],
	);
	for (const [u = 0, v = 0, start = 0, end = 0] of edges)
		outgoing[u]?.push([v, start, end]);
	const best = new Array<number>(n).fill(Number.POSITIVE_INFINITY);
	best[0] = 0;
	const heap = new Heap<[time: number, node: number]>(
		(a, b) => a[0] - b[0],
		[[0, 0]],
	);
	while (heap.size > 0) {
		const [time, node] = heap.pop() ?? [0, 0];
		if (time > (best[node] ?? 0)) continue;
		if (node === n - 1) return time;
		for (const [to, start, end] of outgoing[node] ?? []) {
			const leave = Math.max(time, start);
			if (leave > end || leave + 1 >= (best[to] ?? 0)) continue;
			best[to] = leave + 1;
			heap.push([leave + 1, to]);
		}
	}
	return -1;
};
