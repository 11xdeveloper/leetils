const MAX_WEIGHT = 2_000_000_000;

/**
 * 2699. Modify Graph Edge Weights
 *
 * Some edges of a weighted undirected graph have weight -1. Returns the
 * edges with each -1 replaced by a weight from 1 to 2·10⁹ so the shortest
 * path from `source` to `destination` is exactly `target`, or `[]` if
 * that's impossible.
 *
 * Start with every -1 edge at the maximum, effectively absent. Then set
 * them to 1 one at a time, rerunning Dijkstra: as soon as the distance
 * drops to `target` or below, the last edge can take up the slack and
 * any edges left stay at the maximum.
 *
 * @see https://leetcode.com/problems/modify-graph-edge-weights/
 * @difficulty Hard
 * @timeComplexity O(e · n²)
 * @spaceComplexity O(n² + e)
 *
 * @example
 * modifyGraphEdgeWeights(3, [[0, 1, -1], [0, 2, 5]], 0, 2, 6); // []
 */
export const modifyGraphEdgeWeights = (
	n: number,
	edges: readonly (readonly number[])[],
	source: number,
	destination: number,
	target: number,
): number[][] => {
	const result = edges.map(([a = 0, b = 0, w = 0]) => [
		a,
		b,
		w === -1 ? MAX_WEIGHT : w,
	]);
	const distance = (): number => {
		const weight = Array.from({ length: n }, () =>
			Array.from({ length: n }, () => Number.POSITIVE_INFINITY),
		);
		for (const [a = 0, b = 0, w = 0] of result) {
			(weight[a] ?? [])[b] = w;
			(weight[b] ?? [])[a] = w;
		}
		const best = Array.from({ length: n }, () => Number.POSITIVE_INFINITY);
		const done = new Uint8Array(n);
		best[source] = 0;
		for (;;) {
			let node = -1;
			for (let i = 0; i < n; i++)
				if (!done[i] && (node === -1 || (best[i] ?? 0) < (best[node] ?? 0)))
					node = i;
			if (node === -1 || best[node] === Number.POSITIVE_INFINITY) break;
			if (node === destination) break;
			done[node] = 1;
			for (let next = 0; next < n; next++) {
				const through = (best[node] ?? 0) + (weight[node]?.[next] ?? 0);
				if (through < (best[next] ?? 0)) best[next] = through;
			}
		}
		return best[destination] ?? Number.POSITIVE_INFINITY;
	};

	const initial = distance();
	if (initial < target) return [];
	if (initial === target) return result;
	for (const [i, [, , w]] of edges.entries()) {
		if (w !== -1) continue;
		const edge = result[i] ?? [];
		edge[2] = 1;
		const now = distance();
		if (now <= target) {
			edge[2] = 1 + target - now;
			return result;
		}
	}
	return [];
};
