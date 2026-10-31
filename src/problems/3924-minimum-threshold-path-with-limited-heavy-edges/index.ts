/**
 * 3924. Minimum Threshold Path With Limited Heavy Edges
 *
 * Edges heavier than a threshold are heavy. Returns the smallest
 * threshold leaving a path from `source` to `target` with at most `k`
 * heavy edges, or -1.
 *
 * Raising the threshold only helps, so binary search it over the edge
 * weights (and 0), counting the fewest heavy edges on a path with a 0-1
 * breadth-first search.
 *
 * @see https://leetcode.com/problems/minimum-threshold-path-with-limited-heavy-edges/
 * @difficulty Hard
 * @timeComplexity O((n + m) log m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * minimumThresholdPathWithLimitedHeavyEdges(6, [[0, 1, 5], [1, 2, 3], [3, 4, 4], [4, 5, 1], [1, 4, 2]], 0, 3, 1); // 4
 */
export const minimumThresholdPathWithLimitedHeavyEdges = (
	n: number,
	edges: readonly (readonly number[])[],
	source: number,
	target: number,
	k: number,
): number => {
	const adjacent: [to: number, weight: number][][] = Array.from(
		{ length: n },
		() => [],
	);
	for (const [u = 0, v = 0, w = 0] of edges) {
		adjacent[u]?.push([v, w]);
		adjacent[v]?.push([u, w]);
	}
	const heavyNeeded = (threshold: number): number => {
		const distance = new Array<number>(n).fill(Number.POSITIVE_INFINITY);
		distance[source] = 0;
		const deque = new Int32Array(2 * (edges.length + 1) * 2 + 4 * n + 4);
		let [head, tail] = [deque.length >> 1, deque.length >> 1];
		deque[tail++] = source;
		while (head < tail) {
			const v = deque[head++] ?? 0;
			for (const [to, w] of adjacent[v] ?? []) {
				const step = w > threshold ? 1 : 0;
				const next = (distance[v] ?? 0) + step;
				if (next >= (distance[to] ?? 0)) continue;
				distance[to] = next;
				if (step === 0) deque[--head] = to;
				else deque[tail++] = to;
			}
		}
		return distance[target] ?? Number.POSITIVE_INFINITY;
	};
	const candidates = [0, ...new Set(edges.map((e) => e[2] ?? 0))].sort(
		(a, b) => a - b,
	);
	if (heavyNeeded(candidates.at(-1) ?? 0) > k) return -1;
	let [lo, hi] = [0, candidates.length - 1];
	while (lo < hi) {
		const mid = (lo + hi) >>> 1;
		if (heavyNeeded(candidates[mid] ?? 0) <= k) hi = mid;
		else lo = mid + 1;
	}
	return candidates[lo] ?? 0;
};
