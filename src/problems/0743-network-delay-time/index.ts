import { Heap } from "../../internal/heap";

/**
 * 743. Network Delay Time
 *
 * A signal sent from node `k` travels along directed edges
 * `[from, to, time]` between nodes 1 to `n`. Returns how long until every
 * node has received it, or -1 if some never will.
 *
 * Dijkstra's algorithm from `k`; the answer is the largest shortest
 * distance.
 *
 * @see https://leetcode.com/problems/network-delay-time/
 * @difficulty Medium
 * @timeComplexity O(E log E)
 * @spaceComplexity O(n + E)
 *
 * @example
 * networkDelayTime([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2); // 2
 */
export const networkDelayTime = (
	times: readonly (readonly number[])[],
	n: number,
	k: number,
): number => {
	const edges = Array.from({ length: n + 1 }, (): [number, number][] => []);
	for (const [from = 0, to = 0, time = 0] of times)
		edges[from]?.push([to, time]);

	const distance = new Array<number>(n + 1).fill(Number.POSITIVE_INFINITY);
	distance[k] = 0;
	const queue = new Heap<[number, number]>((a, b) => a[0] - b[0], [[0, k]]);
	for (let entry = queue.pop(); entry; entry = queue.pop()) {
		const [elapsed, node] = entry;
		if (elapsed > (distance[node] ?? 0)) continue;
		for (const [next, time] of edges[node] ?? []) {
			if (elapsed + time < (distance[next] ?? 0)) {
				distance[next] = elapsed + time;
				queue.push([elapsed + time, next]);
			}
		}
	}

	const longest = Math.max(...distance.slice(1));
	return longest === Number.POSITIVE_INFINITY ? -1 : longest;
};
