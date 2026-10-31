import { Heap } from "../../internal/heap";

/**
 * 3977. Minimum Time to Reach Target With Limited Power
 *
 * Leaving node u along an edge needs and uses `cost[u]` power; edges take
 * time. Starting at `source` with `power`, returns the least time to reach
 * `target` and the most power left among the fastest routes, or [-1, -1].
 *
 * Dijkstra over (node, power left), at most 1001 power levels, ordered by
 * time and then by more power left.
 *
 * @see https://leetcode.com/problems/minimum-time-to-reach-target-with-limited-power/
 * @difficulty Hard
 * @timeComplexity O(m · P log(n · P))
 * @spaceComplexity O(n · P)
 *
 * @example
 * minimumTimeToReachTargetWithLimitedPower(5, [[0, 1, 1], [1, 4, 1], [0, 2, 1], [2, 3, 1], [3, 4, 1]], 4, [2, 3, 1, 1, 1], 0, 4); // [3, 0]
 */
export const minimumTimeToReachTargetWithLimitedPower = (
	n: number,
	edges: readonly (readonly number[])[],
	power: number,
	cost: readonly number[],
	source: number,
	target: number,
): number[] => {
	const outgoing: [to: number, time: number][][] = Array.from(
		{ length: n },
		() => [],
	);
	for (const [u = 0, v = 0, t = 0] of edges) outgoing[u]?.push([v, t]);
	const width = power + 1;
	const best = new Float64Array(n * width).fill(Number.POSITIVE_INFINITY);
	const start = source * width + power;
	best[start] = 0;
	const heap = new Heap<[time: number, left: number, node: number]>(
		(a, b) => a[0] - b[0] || b[1] - a[1],
		[[0, power, source]],
	);
	while (heap.size > 0) {
		const [time, left, node] = heap.pop() ?? [0, 0, 0];
		if (time > (best[node * width + left] ?? 0)) continue;
		if (node === target) return [time, left];
		const remaining = left - (cost[node] ?? 0);
		if (remaining < 0) continue;
		for (const [to, t] of outgoing[node] ?? []) {
			const state = to * width + remaining;
			if (time + t < (best[state] ?? 0)) {
				best[state] = time + t;
				heap.push([time + t, remaining, to]);
			}
		}
	}
	return [-1, -1];
};
