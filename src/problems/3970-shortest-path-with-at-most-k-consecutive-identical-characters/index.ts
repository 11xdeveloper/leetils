import { Heap } from "../../internal/heap";

/**
 * 3970. Shortest Path With At Most K Consecutive Identical Characters
 *
 * Nodes carry letters. Returns the lightest path from node 0 to node
 * n - 1 whose letters never repeat more than `k` times in a row, or -1.
 *
 * Dijkstra over (node, length of the current run of its letter).
 *
 * @see https://leetcode.com/problems/shortest-path-with-at-most-k-consecutive-identical-characters/
 * @difficulty Medium
 * @timeComplexity O((n + m) · k log(m · k))
 * @spaceComplexity O(n · k + m)
 *
 * @example
 * shortestPathWithAtMostKConsecutiveIdenticalCharacters(3, [[0, 1, 1], [1, 2, 1], [0, 2, 3]], "aab", 2); // 2
 */
export const shortestPathWithAtMostKConsecutiveIdenticalCharacters = (
	n: number,
	edges: readonly (readonly number[])[],
	labels: string,
	k: number,
): number => {
	const outgoing: [to: number, weight: number][][] = Array.from(
		{ length: n },
		() => [],
	);
	for (const [u = 0, v = 0, w = 0] of edges) outgoing[u]?.push([v, w]);
	const width = k + 1;
	const best = new Float64Array(n * width).fill(Number.POSITIVE_INFINITY);
	best[1] = 0;
	const heap = new Heap<[distance: number, state: number]>(
		(a, b) => a[0] - b[0],
		[[0, 1]],
	);
	while (heap.size > 0) {
		const [distance, state] = heap.pop() ?? [0, 0];
		if (distance > (best[state] ?? 0)) continue;
		const [node, run] = [Math.floor(state / width), state % width];
		if (node === n - 1) return distance;
		for (const [to, weight] of outgoing[node] ?? []) {
			const nextRun = labels[to] === labels[node] ? run + 1 : 1;
			if (nextRun > k) continue;
			const next = to * width + nextRun;
			if (distance + weight < (best[next] ?? 0)) {
				best[next] = distance + weight;
				heap.push([distance + weight, next]);
			}
		}
	}
	return -1;
};
