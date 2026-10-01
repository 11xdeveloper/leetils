import { Heap } from "../../internal/heap";

/**
 * 1976. Number of Ways to Arrive at Destination
 *
 * Counts the shortest routes from intersection 0 to `n − 1`, modulo
 * 10^9 + 7.
 *
 * Dijkstra, also counting for each node the shortest paths reaching it:
 * a strictly shorter path replaces the count, an equal one adds to it.
 *
 * @see https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/
 * @difficulty Medium
 * @timeComplexity O((n + e) log n)
 * @spaceComplexity O(n + e)
 *
 * @example
 * numberOfWaysToArriveAtDestination(7, [[0, 6, 7], [0, 1, 2], [1, 2, 3], [1, 3, 3], [6, 3, 3], [3, 5, 1], [6, 5, 1], [2, 5, 1], [0, 4, 5], [4, 6, 2]]); // 4
 */
export const numberOfWaysToArriveAtDestination = (
	n: number,
	roads: readonly (readonly number[])[],
): number => {
	const neighbours: [number, number][][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0, time = 0] of roads) {
		neighbours[u]?.push([v, time]);
		neighbours[v]?.push([u, time]);
	}
	const distance = new Array<number>(n).fill(Infinity);
	const ways = new Array<number>(n).fill(0);
	[distance[0], ways[0]] = [0, 1];
	const heap = new Heap<[number, number]>((a, b) => a[0] - b[0], [[0, 0]]);
	for (let entry = heap.pop(); entry; entry = heap.pop()) {
		const [d, node] = entry;
		if (d > (distance[node] ?? 0)) continue;
		for (const [next, time] of neighbours[node] ?? []) {
			const candidate = d + time;
			if (candidate < (distance[next] ?? Infinity)) {
				distance[next] = candidate;
				ways[next] = ways[node] ?? 0;
				heap.push([candidate, next]);
			} else if (candidate === distance[next]) {
				ways[next] = ((ways[next] ?? 0) + (ways[node] ?? 0)) % 1_000_000_007;
			}
		}
	}
	return ways[n - 1] ?? 0;
};
