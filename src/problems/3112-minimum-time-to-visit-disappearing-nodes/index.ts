import { Heap } from "../../internal/heap";

/**
 * 3112. Minimum Time to Visit Disappearing Nodes
 *
 * In an undirected weighted graph, node i vanishes at time
 * `disappear[i]`. Returns the earliest arrival time at each node starting
 * from node 0 at time 0, or -1 if it can't be reached before it vanishes.
 *
 * Dijkstra, ignoring arrivals at or after a node's vanishing time.
 *
 * @see https://leetcode.com/problems/minimum-time-to-visit-disappearing-nodes/
 * @difficulty Medium
 * @timeComplexity O((n + e) log e)
 * @spaceComplexity O(n + e)
 *
 * @example
 * minimumTimeToVisitDisappearingNodes(3, [[0, 1, 2], [1, 2, 1], [0, 2, 4]], [1, 1, 5]); // [0, -1, 4]
 */
export const minimumTimeToVisitDisappearingNodes = (
	n: number,
	edges: readonly (readonly number[])[],
	disappear: readonly number[],
): number[] => {
	const adjacent: [next: number, length: number][][] = Array.from(
		{ length: n },
		() => [],
	);
	for (const [u = 0, v = 0, length = 0] of edges) {
		adjacent[u]?.push([v, length]);
		adjacent[v]?.push([u, length]);
	}
	const time = new Array<number>(n).fill(-1);
	const queue = new Heap<[time: number, node: number]>(
		(a, b) => a[0] - b[0],
		[[0, 0]],
	);
	for (let top = queue.pop(); top; top = queue.pop()) {
		const [now, node] = top;
		if (time[node] !== -1) continue;
		time[node] = now;
		for (const [next, length] of adjacent[node] ?? [])
			if (time[next] === -1 && now + length < (disappear[next] ?? 0))
				queue.push([now + length, next]);
	}
	return time;
};
